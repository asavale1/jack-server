'use strict'

function irController(){
	var child_process = require('child_process')
	var exec = child_process.exec;
	var spawn = child_process.spawn

	this.sendCommand = function(req, res, next){
		var device = req.params.device
		var command = req.params.command
		exec("irsend SEND_ONCE " + device + " " + command, function(err, stdout, stderr) {
		});
		console.log("Send command " + command + " on device " + device);
		return res.send("Run command " + command + " on device " + device);
	};

	this.getDevices = function(req, res, next){		
		exec('irsend LIST "" ""', function(err, stdout, stderr){
			var deviceList = stderr.split("\n");
			var devices = []
			for(var i = 0; i < deviceList.length; i++){
				if(deviceList[i] != ''){
					devices.push(deviceList[i].split(":")[1].trim())
				}
			}
			return res.send(devices)
		});
	};

	this.getDeviceCommands = function(req, res, next){
		var device = req.params.device
		exec('irsend LIST ' + device + ' ""', function(err, stdout, stderr){
			var commandList = stderr.split("\n");
			var commands = []
			for(var i = 0; i < commandList.length; i++){
				if(commandList[i] != ''){
					commands.push(commandList[i].split(' ')[2].trim());
				}
			}
			return res.send(commands);
		});
	};

	this.getCommands = function(req, res, next){
		exec('irrecord --list-namespace', function(err, stdout, stderr){
			var commands = stdout.trim().split("\n");
			return res.send(commands);
		});
	};

	return this;
}; 

module.exports = new irController();
