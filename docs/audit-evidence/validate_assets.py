import json, concurrent.futures, urllib.request, urllib.error
from pathlib import Path
from urllib.parse import urljoin,urlsplit
from crawl_live import BASE
OUT=Path(__file__).parent
pages=json.loads((OUT/'live-crawl.json').read_text())['pages']
assets=set(); external=set(); missing_alt=[]
for p in pages:
 for img in p.get('images',[]):
  if img.get('src'): assets.add(urljoin(p['url'],img['src']))
  if not img.get('alt'): missing_alt.append({'page':p['url'],'src':img.get('src'),'note':'Empty alt can be appropriate for decorative images; review context.'})
 if p.get('og',{}).get('og:image'): assets.add(p['og']['og:image'])
 for link in p.get('links',[]):
  if urlsplit(link).scheme in ('https','http') and urlsplit(link).netloc!='pahariyatri.com': external.add(link)
def check(url):
 try:
  with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'PahariYatriAudit/1.0'},method='HEAD'),timeout=25) as r:
   return {'url':url,'status':r.status,'final_url':r.url,'type':r.headers.get('Content-Type'),'length':r.headers.get('Content-Length')}
 except urllib.error.HTTPError as e: return {'url':url,'status':e.code,'note':'HEAD failure is not definitive GET breakage'}
 except Exception as e:return {'url':url,'status':None,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: a=list(pool.map(check,sorted(assets))); e=list(pool.map(check,sorted(external)))
result={'assets':a,'external_links':e,'empty_or_missing_alt':missing_alt}
(OUT/'asset-link-check.json').write_text(json.dumps(result,indent=2))
print(json.dumps({'assets_checked':len(a),'asset_non200':[x for x in a if x['status']!=200],'external_checked':len(e),'external_non200':[x for x in e if x['status']!=200],'empty_alt_occurrences':len(missing_alt)},indent=2))
