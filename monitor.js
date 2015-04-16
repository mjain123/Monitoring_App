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
		console.log("Avg Memory load: "+ totalmemoryload/10);
		console.log("Avg Cpu load: "+ totalcpu);
		var writeobj = {avgmem: (totalmemoryload/10), avgcpu: (totalcpu)};
		fs.writeFile("file.json", JSON.stringify(writeobj), "utf8",function(err) {
    if(err) {
        return console.log(err);
    }
});

}, 1000);
