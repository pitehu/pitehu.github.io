import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('.');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.pdf':'application/pdf','.json':'application/json','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{try{let file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return}if((await stat(file)).isDirectory())file=path.join(file,'index.html');res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-cache');res.end(await readFile(file));}catch{res.writeHead(404,{'Content-Type':'text/html'});res.end('<h1>Page not found</h1><a href="/">Back to Tiancheng Hu</a>')}}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
