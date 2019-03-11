const uws = require('uWebSockets.js/uws.js');
const ProxyServer = require('./ProxyServer');


class HttpsProxyServer extends ProxyServer {
  constructor(options) {
    super(uws.SSLApp(options));
    this.agent = require('https');
    this.port = process.env.u_HTTPS_PORT;
  }
}


module.exports = HttpsProxyServer;