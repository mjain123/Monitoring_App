var httpProxy = require('http-proxy');
var options = {};
var proxy   = httpProxy.createProxyServer(options);
var express = require('express')
var app = express();


var TARGET = 'http://127.0.0.1:3001';


app.get('/switch', function(req, res){
console.log("login");
res.send("login");
});


app.get('/*', function(req, res, next) {
	console.log(req.url);
proxy.web( req, res, {target: TARGET} );

});

app.listen(3000,'localhost');