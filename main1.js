var options = {};

var express = require('express')
var app = express();
var sio = require('socket.io')
  , request = require('request')
  , os = require('os')
  ,responseTime = require('response-time')
  ,_responseTime = responseTime()
  ;
var heartbeats = require('heartbeats');
var heart = heartbeats.createHeart(1000);

app.get('/', function(req, res) {
	console.log(req.url);
	res.send("Welcome to Application Server")
});


var memload =[];
var cpuTicks =[];
var cpuaverage =[];
var startMeasure = cpuTicksAcrossCores();

app.listen(3001,'localhost');
/*
heart.createEvent(2, function(heartbeat, last){
  memload.push(memoryLoad());
  cpuTicks.push(cpuTicksAcrossCores());
  cpuaverage.push(cpuAverage());
  if(memload.length>=10)
  {
  	memload.shift();
    cpuTicks.shift();
    cpuaverage.shift();
  }
})
*/

app.get('/monitor', function(req,res) {
	memload = memoryLoad();
  cpuTicks = cpuTicksAcrossCores();
  cpuaverage =cpuAverage();
	var output = "Memload :"+ memload +"<br>Cpu Average: "+cpuaverage;
	res.send(output);

});

function memoryLoad()
{
	var totalmemory = os.totalmem();
	var freememory = os.freemem();
	//console.log( totalmemory, freememory );
	var memUsed = totalmemory - freememory;
	var loadpercent = memUsed/totalmemory * 100 ;
	return (~~(loadpercent));

}

// Create function to get CPU information
function cpuTicksAcrossCores() 
{
  //Initialise sum of idle and time of cores and fetch CPU info
  var totalIdle = 0, totalTick = 0;
  var cpus = os.cpus();
 
  //Loop through CPU cores
  for(var i = 0, len = cpus.length; i < len; i++) 
  {
		//Select CPU core
		var cpu = cpus[i];
		//Total up the time in the cores tick
		for(type in cpu.times) 
		{
			totalTick += cpu.times[type];
		}     
		//Total up the idle time of the core
		totalIdle += cpu.times.idle;
  }
 
  //Return the average Idle and Tick times
  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}


function cpuAverage()
{
	var endMeasure = cpuTicksAcrossCores(); 
 
	//Calculate the difference in idle and total time between the measures
	var idleDifference = endMeasure.idle - startMeasure.idle;
	var totalDifference = endMeasure.total - startMeasure.total;
 
 	var cpuload = (totalDifference - idleDifference)/totalDifference
	//Calculate the average percentage CPU usage
	return (~~(cpuload*100));
}
