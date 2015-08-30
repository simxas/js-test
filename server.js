'use strict';

var path = require('path');

var express = require('express');
var compression = require('compression');
var httpProxy = require('http-proxy');

var expressApplication = express();
var proxy = httpProxy.createProxyServer();

expressApplication.use(compression());
expressApplication.use(express.static(path.join(__dirname, 'public')));

expressApplication.listen(8080, function () {
   console.log('server is up and running waiting for you on http://localhost:8080. happy coding!');
});

expressApplication.get('/Api*', function (req, res) {
    proxy.web(req, res, {target: 'http://dev.markitondemand.com'});
});
