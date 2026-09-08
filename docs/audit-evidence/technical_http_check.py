"""Read-only localhost production-server checks. No form POSTs."""
import json, concurrent.futures
from pathlib import Path
from urllib.request import Request, build_opener, HTTPRedirectHandler
from urllib.error import HTTPError
from urllib.parse import urlsplit
class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self,*args,**kwargs): return None

def fetch(item):
    route,ua=item
    req=Request('http://127.0.0.1:3187'+route,headers={'User-Agent':ua})
    try:
        r=build_opener(NoRedirect).open(req,timeout=25)
    except HTTPError as e: r=e
    except Exception as e: return {'route':route,'ua':ua,'error':str(e)}
    body=r.read()
    result={'route':route,'ua':ua,'status':r.status,'location':r.headers.get('Location'),'content_type':r.headers.get('Content-Type'),'bytes':len(body)}
    if 'image/png' in (result['content_type'] or '') and body.startswith(b'\x89PNG'):
        result['dimensions']=[int.from_bytes(body[16:20],'big'),int.from_bytes(body[20:24],'big')]
    return result
ua='Mozilla/5.0 technical-local-audit'
pages=json.loads(Path('docs/audit-evidence/technical-built-pages.json').read_text())
items=[(urlsplit(p['url']).path,ua) for p in pages]
extras=['/scan-me','/admin','/keystatic','/api/keystatic/config','/api/discord','/api/og','/api/og?type=book&title=Sacred%20Mandi','/llms.txt','/llms-full.txt','/robots.txt','/sitemap.xml','/audit-nonexistent-path','/himachal/places/audit-nonexistent','/books/winter/not-a-chapter','/books/temples-traditions/kamrunag-the-lake-of-oaths','/himachal/stories/bell-and-thunder?utm_source=qa','/static/images/pahari-yatri-banner.png','/social-share']
items += [(x,ua) for x in extras]
items += [('/chapters/kamrunag-the-lake-of-oaths',x) for x in ['Googlebot','OAI-SearchBot','ChatGPT-User','HeadlessChrome','facebookexternalhit/1.1']]
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: results=list(pool.map(fetch,items))
Path('docs/audit-evidence/technical-http-results.json').write_text(json.dumps(results,indent=2))
print(json.dumps({'sitemap_checked':len(pages),'sitemap_status_counts':{str(s):sum(r.get('status')==s for r in results[:len(pages)]) for s in set(r.get('status') for r in results[:len(pages)])}},indent=2))
print(json.dumps(results[len(pages):],indent=2))
