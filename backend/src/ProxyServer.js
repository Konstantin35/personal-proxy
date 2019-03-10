const https = require('http'); // TODO: https!
const uws = require('uWebSockets.js/uws.js');
/*
*   @see
*   https://github.com/uNetworking/uWebSockets.js
*   https://unetworking.github.io/uWebSockets.js/generated/
*/
class ProxyServer {

  constructor(options) {
    this.app = uws.App();
  }


  init() {
    this.setup();
    this.listen();
  }


  setup() {
    this.app.get('/*', (res, req) => {
      let url = req.getUrl();
      res.onAborted(() => res.close());
      this.request(url, res);
    });
  }

  listen() {
    const { port } = ProxyServer;
    this.app.listen(port, token => {
      if (token) {
        console.log('Listening to port ' + port);
      } else {
        console.log('Failed to listen to port ' + port);
      }
    });
  }

  request(url, proxyResponse) {
    https
      .get(url, requestResponse => {
        requestResponse.on('data', chunk => proxyResponse.write(chunk.toString()));
        requestResponse.on('end', () => proxyResponse.end());
      })
      .on('error', e => {
        console.error(e.message);
        proxyResponse.close();
      });
  }
}


ProxyServer.port = 8080;


module.exports = ProxyServer;