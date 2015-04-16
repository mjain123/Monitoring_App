var httpProxy = require('http-proxy');
var options = {};
var proxy   = httpProxy.createProxyServer(options);
var express = require('express')
var app = express();
var instances = ['http://52.6.85.129:3001', 'http://52.6.85.140:3001']

var TARGET = '';
var counter = 0;

app.get('/switch', function(req, res){
console.log("login");
res.send("login");
});


app.get('/*', function(req, res, next) {
TARGET = instances[counter];
counter++;
if(counter==instances.length)
	counter = 0;
console.log(req.url);
proxy.web( req, res, {target: TARGET} );

});

app.listen(3001,'172.31.8.24');
