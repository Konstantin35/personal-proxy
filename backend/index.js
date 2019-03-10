require('dotenv').config();
const ProxyServer = require('./src/ProxyServer');

new ProxyServer().init();