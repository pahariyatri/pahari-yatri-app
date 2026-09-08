// Read-only Keystatic enumeration; no environment files loaded.
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');
const filename = require('node:path').resolve('keystatic.config.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const configModule = new Module(filename, module);
configModule.filename = filename;
configModule.paths = Module._nodeModulePaths(process.cwd());
configModule._compile(compiled, filename);
const { createReader } = require('@keystatic/core/reader');
const reader = createReader(process.cwd(), configModule.exports.default);
(async () => {
 const report = {};
 for (const name of ['regions','destinations','places','books','chapters','stories','films']) {
  const slugs = await reader.collections[name].list();
  const all = await reader.collections[name].all();
  const files = fs.readdirSync(`data/${name}`, {withFileTypes:true});
  report[name] = { listCount:slugs.length, allCount:all.length, directoryEntries:files.filter(f=>f.isDirectory()).map(f=>f.name), slugs, entries:[] };
  for (const {slug,entry} of all) {
   const row = {slug,title:entry.title};
   if (typeof entry.content === 'function') { const content = await entry.content(); row.contentType=typeof content; row.contentCharacters=String(content).length; }
   if (name==='chapters') { row.hasOffering=!!entry.offering; row.hasOverview=!!entry.overview; row.hasItinerary=!!entry.itinerary?.length; row.verificationStatus=entry.verificationStatus; }
   report[name].entries.push(row);
  }
 }
 fs.writeFileSync('docs/audit-evidence/technical-reader-results.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify(Object.fromEntries(Object.entries(report).map(([k,v])=>[k,{list:v.listCount,all:v.allCount,directories:v.directoryEntries} ])),null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
