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

  //response.setHeader('Content-Type', 'text/html;charset=utf-8');
  let filename = pathname.substring(1)
  if (filename === '') {
    filename = 'index.html'
  }
  fs.readFile(p.resolve(publicDir, filename), (err, data) => {
    if (err) {
      if (err.errno === -4058) {
        response.statusCode = 404;
        fs.readFile(p.resolve(publicDir, '404.html'), (err, data) => {
          response.end(data)
        })
      } else if (err.errno === -4068) {
        response.statusCode = 403;
        response.end('无权查看目录内容')

      } else {
        response.statusCode = 500
        response.end('服务器繁忙，请稍后再试')
      }
    } else {
      response.end(data)
    }
  })
})

server.listen(8888, () => {
  console.log(server.address())
});