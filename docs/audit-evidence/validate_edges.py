import json, concurrent.futures, urllib.request, urllib.error
from pathlib import Path
from crawl_live import inspect,BASE,get
O=Path(__file__).parent
p=json.loads((O/'live-crawl.json').read_text())['pages']
urls=[BASE+'/himachal/stories/'+r['url'].split('/')[-1] for r in p if '/stories/' in r['url']]
urls += [BASE+'/books/summer/parashar-lake-trek',BASE+'/scan-me',BASE+'/audit-nonexistent-route-20260907',BASE+'/static/images/chapters/himachal-temple-etiquette/image.jpg',BASE+'/_next/image?url=%2Fstatic%2Fimages%2Fchapters%2Fhimachal-temple-etiquette%2Fimage.jpg&w=3840&q=75']
class NoRedirect(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,*args,**kwargs):return None
opener=urllib.request.build_opener(NoRedirect)
def check(u):
 try:
  with opener.open(urllib.request.Request(u,headers={'User-Agent':'PahariYatriAudit/1.0'}),timeout=30) as r: first={'status':r.status,'location':r.headers.get('Location')}
 except urllib.error.HTTPError as e:first={'status':e.code,'location':e.headers.get('Location')}
 except Exception as e:first={'error':str(e)}
 row=inspect(u);row.pop('text',None);row.pop('links',None);row['first_response']=first;return row
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:r=list(pool.map(check,urls))
(O/'edge-route-check.json').write_text(json.dumps(r,indent=2))
print(json.dumps([{'url':x['url'],'first':x['first_response'],'final_status':x['status'],'final_url':x['final_url'],'robots':x.get('robots'),'canonical':x.get('canonical')} for x in r],indent=2))
