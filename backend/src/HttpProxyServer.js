const uws = require('uWebSockets.js/uws.js');
const ProxyServer = require('./ProxyServer');


class HttpProxyServer extends ProxyServer {
  constructor() {
    super(uws.App());
    this.agent = require('http');
    this.port = process.env.u_HTTP_PORT;
  }
}


module.exports = HttpProxyServer;