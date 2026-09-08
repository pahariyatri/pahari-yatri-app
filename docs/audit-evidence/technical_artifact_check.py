"""Read-only generated-public-artifact inspection; run from repository root."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
from collections import Counter
import json
import xml.etree.ElementTree as ET

class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.title=''; self.h1=[]; self.meta={}; self.canonical=[]; self.links=[]; self.schemas=[]; self.script=None; self.buf=''; self.in_title=False; self.in_h1=False; self.visible=[]; self.suppress=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='title': self.in_title=True
        if tag=='h1': self.in_h1=True; self.h1.append('')
        if tag=='meta': self.meta.setdefault(a.get('name',a.get('property','')),[]).append(a.get('content',''))
        if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a.get('href'))
        if tag=='a' and a.get('href'): self.links.append(a['href'])
        if tag in ('script','style'): self.suppress+=1
        if tag=='script': self.script=a.get('type',''); self.buf=''
    def handle_data(self,data):
        if self.in_title: self.title+=data
        if self.in_h1: self.h1[-1]+=data
        if self.script is not None: self.buf+=data
        if not self.suppress: self.visible.append(data)
    def handle_endtag(self,tag):
        if tag=='title': self.in_title=False
        if tag=='h1': self.in_h1=False
        if tag in ('script','style'): self.suppress=max(0,self.suppress-1)
        if tag=='script':
            if self.script=='application/ld+json':
                try: self.schemas.append(json.loads(self.buf))
                except ValueError: self.schemas.append({'parse_error':True})
            self.script=None

base=Path('.next/server/app'); out=Path('docs/audit-evidence')
xml=ET.parse(base/'sitemap.xml.body'); urls=[x.text for x in xml.iter() if x.tag.endswith('}loc')]
rows=[]
for url in urls:
    route=urlsplit(url).path
    f=base/('index.html' if route=='/' else route.strip('/')+'.html')
    row={'url':url,'artifact':str(f),'exists':f.exists()}
    if f.exists():
        p=Page(); p.feed(f.read_text()); row.update(title=p.title,h1=p.h1,canonical=p.canonical,meta=p.meta,links=sorted(set(p.links)),schemas=p.schemas,visible_word_count=len(' '.join(p.visible).split()))
    rows.append(row)
(out/'technical-built-pages.json').write_text(json.dumps(rows,indent=2,ensure_ascii=False))
counts=Counter(urlsplit(x).path.split('/')[1] for x in urls)
missing=[r['url'] for r in rows if not r['exists']]
badcanon=[{'url':r['url'],'canonical':r.get('canonical')} for r in rows if r['exists'] and [x.rstrip('/') for x in r['canonical']] != [r['url'].rstrip('/')]]
titles=Counter(r.get('title') for r in rows)
summary={'sitemap_count':len(urls),'sitemap_unique':len(set(urls)),'first_path_segment_counts':dict(counts),'missing_artifacts':missing,'canonical_mismatches':badcanon,'duplicate_titles':{k:v for k,v in titles.items() if v>1},'non_single_h1':[{'url':r['url'],'h1':r.get('h1')} for r in rows if len(r.get('h1',[]))!=1]}
(out/'technical-artifact-summary.json').write_text(json.dumps(summary,indent=2,ensure_ascii=False))
print(json.dumps(summary,indent=2,ensure_ascii=False))
for route in ['/stories','/chapters','/chapters/kamrunag-the-lake-of-oaths','/chapters/parashar-lake-trek','/stories/bell-and-thunder']:
    row=next((r for r in rows if urlsplit(r['url']).path==route),None)
    print(route,json.dumps({k:row.get(k) for k in ['title','h1','canonical','visible_word_count','meta']} if row else None,ensure_ascii=False))
