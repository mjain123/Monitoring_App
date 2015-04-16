var fs = require('fs')
var value = require('./file.json');
var request = require('request');
var fs = require('fs');

var i = 0;
var totalmemoryload = 0;
var totalcpu = 0;

for( i=0;i<10;i++)
{
	request.get('http://52.5.154.138:3001/monitor', function(req,res) {
		var resp = JSON.parse(res.body);
		//console.log(resp.cpu);
		totalmemoryload = totalmemoryload + resp.memload;
		totalcpu = totalcpu + resp.cpu;
	});
	
}

setTimeout(function(req,res){
		var basememval = value.avgmem;
		var basecpuval = value.avgcpu;
		if(basememval < (totalmemoryload/10))
			console.log("Canary release results in higher memory load");
		if(basecpuval < (totalcpu))
			console.log("Canary release results in higher cpu usage");
}, 1000);