/*
*   @see
*   https://github.com/uNetworking/uWebSockets.js
*   https://unetworking.github.io/uWebSockets.js/generated/
*/
class ProxyServer {

  constructor(app) {
    this.app = app;
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
    const { port } = this;
    this.app.listen(port, token => {
      if (token) {
        console.log(this.constructor.name + port);
      } else {
        console.log('Failed to listen to port ' + port);
      }
    });
  }

  request(url, proxyResponse) {
    this
      .agent
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


module.exports = ProxyServer;