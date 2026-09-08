"""Read-only, bounded same-host SEO crawl; no forms or authenticated routes."""
import concurrent.futures, datetime, hashlib, json, re, time
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, urlunsplit
import urllib.request, urllib.error
import xml.etree.ElementTree as ET
BASE='https://pahariyatri.com'
OUT=Path(__file__).parent
class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True); self.meta={}; self.links=[]; self.images=[]; self.canon=[]; self.headings=[]; self.title=''; self.text=[]; self.scripts=[]; self.active=[]; self.skip=0; self.ld=None
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='meta': self.meta[a.get('name',a.get('property',''))]=a.get('content','')
        if tag=='link' and 'canonical' in (a.get('rel') or ''): self.canon.append(a.get('href',''))
        if tag=='a' and a.get('href'): self.links.append(a['href'])
        if tag=='img': self.images.append(a)
        if tag=='title' or re.fullmatch('h[1-6]',tag): self.active.append([tag,''])
        if tag in ('script','style'): self.skip+=1
        if tag=='script' and a.get('type')=='application/ld+json': self.ld=''
    def handle_endtag(self,tag):
        if tag in ('script','style'): self.skip=max(0,self.skip-1)
        if tag=='script' and self.ld is not None: self.scripts.append(self.ld); self.ld=None
        if self.active and tag==self.active[-1][0]:
            t,s=self.active.pop()
            if t=='title': self.title=s.strip()
            else: self.headings.append([t,s.strip()])
    def handle_data(self,data):
        if self.ld is not None: self.ld+=data
        if self.active: self.active[-1][1]+=data
        if not self.skip and data.strip(): self.text.append(data.strip())
def normalize(url):
    p=urlsplit(urljoin(BASE+'/',url)); return urlunsplit((p.scheme,p.netloc,p.path or '/','',''))
def get(url):
    req=urllib.request.Request(url,headers={'User-Agent':'PahariYatriAudit/1.0 (read-only SEO audit)'})
    start=time.monotonic()
    try:
        with urllib.request.urlopen(req,timeout=35) as r: return r.status,r.url,dict(r.headers),r.read(),round(time.monotonic()-start,3)
    except urllib.error.HTTPError as e: return e.code,e.url,dict(e.headers),e.read(),round(time.monotonic()-start,3)
    except Exception as e: return None,url,{},str(e).encode(),round(time.monotonic()-start,3)
def inspect(url):
    status,final,headers,body,elapsed=get(url)
    r={'url':url,'status':status,'final_url':final,'seconds':elapsed,'content_type':headers.get('Content-Type',''),'x_robots_tag':headers.get('X-Robots-Tag','')}
    if 'text/html' not in r['content_type']: return r
    p=Page(); p.feed(body.decode('utf-8','replace'))
    structured=[]
    for s in p.scripts:
        try: structured.append({'valid_json':True,'data':json.loads(s)})
        except Exception as e: structured.append({'valid_json':False,'error':str(e)})
    text=' '.join(p.text)
    r.update(title=p.title,description=p.meta.get('description',''),canonical=p.canon,robots=p.meta.get('robots',''),headings=p.headings,og={k:v for k,v in p.meta.items() if k.startswith('og:')},author=p.meta.get('author',''),links=sorted(set(urljoin(final,l) for l in p.links)),images=p.images,structured_data=structured,visible_words=len(text.split()),text_hash=hashlib.sha256(text.encode()).hexdigest(),text=text)
    return r
if __name__=='__main__':
    OUT.mkdir(parents=True,exist_ok=True)
    controls={}
    for name in ('robots.txt','sitemap.xml','llms.txt','llms-full.txt'):
        status,final,headers,body,t=get(BASE+'/'+name); (OUT/('live-'+name)).write_bytes(body)
        controls[name]={'status':status,'final_url':final,'headers':headers}
    root=ET.parse(OUT/'live-sitemap.xml').getroot()
    locs=[e.text for e in root.iter() if e.tag.endswith('}loc') and e.text]
    (OUT/'controls.json').write_text(json.dumps(controls,indent=2))
    todo=set(locs)|{BASE+'/'}; seen=set(); results=[]
    while todo:
        batch=sorted(todo-seen); todo=set()
        if not batch: break
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            for row in pool.map(inspect,batch):
                results.append(row); seen.add(row['url'])
                with (OUT/'live-crawl.jsonl').open('a') as f: f.write(json.dumps(row)+'\n')
                for link in row.get('links',[]):
                    u=normalize(link); p=urlsplit(u)
                    if p.netloc=='pahariyatri.com' and not p.path.startswith(('/api/','/keystatic','/_next/','/static/')) and not re.search(r'\.(jpg|png|avif|webp|svg|mp4|mp3|pdf|ico)$',p.path,re.I) and u not in seen: todo.add(u)
        print('Crawled',len(seen),'queued',len(todo),flush=True)
        if len(seen)+len(todo)>400: raise RuntimeError('Crawl safety bound exceeded')
    incoming={normalize(r['url']):set() for r in results}
    for r in results:
        for link in r.get('links',[]):
            u=normalize(link)
            if u in incoming and normalize(r['url'])!=u: incoming[u].add(r['url'])
    for r in results:
        r['in_sitemap']=r['url'] in locs; r['incoming_pages']=sorted(incoming.get(normalize(r['url']),set()))
    (OUT/'live-crawl.json').write_text(json.dumps({'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sitemap_urls':locs,'pages':results},indent=2))
    summary={'crawled':len(results),'sitemap_entries':len(locs),'unique_sitemap_entries':len(set(locs)),'status_counts':{str(s):sum(r['status']==s for r in results) for s in set(r['status'] for r in results)},'missing_title':[r['url'] for r in results if 'headings' in r and not r['title']],'missing_description':[r['url'] for r in results if 'headings' in r and not r['description']],'h1_not_one':[(r['url'],sum(h[0]=='h1' for h in r['headings'])) for r in results if 'headings' in r and sum(h[0]=='h1' for h in r['headings'])!=1],'orphans':[r['url'] for r in results if r['in_sitemap'] and not r['incoming_pages'] and r['url']!=BASE+'/'],'non200':[(r['url'],r['status'],r['final_url']) for r in results if r['status']!=200]}
    (OUT/'crawl-summary.json').write_text(json.dumps(summary,indent=2)); print(json.dumps(summary,indent=2))
