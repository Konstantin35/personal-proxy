require('dotenv').config();
const HttpProxyServer = require('./src/HttpProxyServer');
const HttpsProxyServer = require('./src/HttpsProxyServer');


const options = {
  key_file_name: 'agent-key.key',
  cert_file_name: 'agent-cert.pem'
};


new HttpProxyServer().init();
new HttpsProxyServer(options).init();