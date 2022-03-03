import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer();

server.on('request', (request: IncomingMessage, response: ServerResponse) => {

  const array = []
  request.on('data', (chunk) => {
    array.push(chunk)
  })
  request.on('end', () => {
    const body = Buffer.concat(array).toString()
    console.log('body')
    console.log(body)

  })
  response.statusCode = 404;
  response.setHeader('X-qq', 'your qq code?')
  response.write('1\n')
  response.end()

})

server.listen(8888, () => {
  console.log(server.address())
});