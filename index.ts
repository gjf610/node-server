import * as http from 'http';
import * as fs from 'fs';
import * as p from 'path';
import * as url from 'url';
import { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public')
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const { method, url: path, headers } = request
  const { pathname, search } = url.parse(path)
  switch (pathname) {
    case '/index.html':
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'index.html'), (err, data) => {
        if (err) throw err;
        response.end(data.toString())
      })
      break;
    case '/style.css':
      response.setHeader('Content-Type', 'text/css;charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'style.css'), (err, data) => {
        if (err) throw err;
        response.end(data.toString())
      })
      break;
    case '/main.js':
      response.setHeader('Content-Type', 'text/javascript;charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'main.js'), (err, data) => {
        if (err) throw err;
        response.end(data.toString())
      })
      break;
    default:
      response.statusCode = 404;
      response.end()
  }
})

server.listen(8888, () => {
  console.log(server.address())
});