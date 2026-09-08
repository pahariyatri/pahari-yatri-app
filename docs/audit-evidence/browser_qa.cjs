const {chromium}=require('playwright');
const fs=require('fs');
const path=require('path');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
 const results=[];
 const routes=['/','/books/temples-traditions','/chapters/kamrunag-the-lake-of-oaths','/stories/mirror-of-stillness','/himachal/travel-guide/mandi','/himachal/places/manikaran','/stories','/why-pahari-yatri'];
 for(const [device,viewport] of Object.entries({desktop:{width:1440,height:1000},mobile:{width:390,height:844}})){
  const context=await browser.newContext({viewport,isMobile:device==='mobile',hasTouch:device==='mobile'});
  await context.route('**/api/discord',r=>r.abort());
  const page=await context.newPage();
  for(const route of routes){
   const errors=[],consoleErrors=[],failed=[];
   const pe=e=>errors.push(e.message),ce=m=>{if(m.type()==='error')consoleErrors.push(m.text())},rf=r=>failed.push({url:r.url(),error:r.failure()?.errorText});
   page.on('pageerror',pe);page.on('console',ce);page.on('requestfailed',rf);
   const row={device,route};
   try{
    const response=await page.goto('https://pahariyatri.com'+route,{waitUntil:'networkidle',timeout:60000});
    row.status=response.status();
    await page.evaluate(async()=>{await document.fonts.ready;window.scrollTo(0,document.body.scrollHeight)});
    await page.waitForTimeout(800);
    row.dom=await page.evaluate(()=>({title:document.title,h1:[...document.querySelectorAll('h1')].map(e=>e.innerText),overflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.currentSrc||i.src),links:[...document.querySelectorAll('a[href]')].map(a=>({text:a.innerText,url:a.href})),text:document.body.innerText,performance:performance.getEntriesByType('navigation').map(n=>({domContentLoaded:n.domContentLoadedEventEnd,load:n.loadEventEnd,ttfb:n.responseStart}))}));
    await page.evaluate(()=>window.scrollTo(0,0));
    row.screenshot=path.join(__dirname,`browser-${device}-${route.replaceAll('/','_')||'home'}.png`);
    await page.screenshot({path:row.screenshot,fullPage:true});
   }catch(e){row.error=e.message}
   row.pageErrors=errors;row.consoleErrors=consoleErrors;row.failedRequests=failed;results.push(row);
   page.off('pageerror',pe);page.off('console',ce);page.off('requestfailed',rf);
   fs.writeFileSync(path.join(__dirname,'browser-qa.json'),JSON.stringify(results,null,2));
   console.log(JSON.stringify({...row,dom:row.dom?{title:row.dom.title,h1:row.dom.h1,overflow:row.dom.overflow,brokenImages:row.dom.brokenImages}:null}));
  }
  await context.close();
 }
 await browser.close();
})();
