'use strict'

function irConfigurationController(){
	var exec = 	require('child_process').exec;
	var WORKSPACE = process.env.JACK_WORKSPACE; //"/opt/jack/workspace";
	var CONFIG_SOURCE = process.env.JACK_CONFIGS; //"/opt/jack/configs/";

	var remoteConfigs = require("../lib/db/remote_configs.js")


	this.initConfiguration = function(req, res, next){
		console.log("Init Config: " + req.params.device);
		console.log("/bin/sh /opt/jack/src/lib/configuration/init.sh " + req.params.device + " " + req.params.raw_mode);
		exec("/bin/sh /opt/jack/src/lib/configuration/init.sh " + req.params.device + " " + req.params.raw_mode, function(err, stdout, stderr){
			console.log("Init Configuration (out): " + stdout);
			console.log("Init Configuration (err): " + stderr);
		}).on("exit", function(code){
			return res.send({"status":code});
		});
	};

	this.sendCommand = function(req, res, next){
		var command = req.params.command
		console.log("Command: " + command);
		exec("cd " + WORKSPACE + ";echo " + command + " > stdin.pipe", function(err, stdout, stderr){
			console.log("Send Command (out): " + stdout);
			console.log("Send Command (err): " + stderr);
		}).on("exit", function(code){
			return res.send({"status":code})
		});
	}

	this.terminateConfiguration = function(req, res, next){
		console.log("Terminate Config: " + req.params.device);
		exec("/bin/sh /opt/jack/src/lib/configuration/cleanup.sh " + req.params.device, function(err, stdout, stderr){
			console.log("Terminate Configuration (out): " + stdout);
			console.log("Terminate Configuration (err): " + stderr);
		}).on("exit", function(code){
			return res.send({"status":code})
		});
	};

	this.saveConfiguration = function(req, res, next){
		let command = ". /etc/profile; /usr/bin/python /opt/jack/src/lib/configuration/save.py " + req.params.name;

		remoteConfigs.addConfig({
			"name": req.params.name,
			"file": CONFIG_SOURCE + req.params.name,
			"keys": req.params.keys
		});

		exec(command, function(err, stdout, stderr){
			console.log("Save Configuration (out): " + stdout);
			console.log("Save Configuration (err): " + stderr);
		}).on("exit", function(code){
			return res.send({"status":code})
		});
	};

	this.getOutput = function(req, res, next){
		exec("cat " + WORKSPACE + "/stdout", function(err, stdout, stderr) {
			console.log(stdout.trim());
			return res.send(stdout.trim())
		});
	};

	this.getError = function(req, res, next){
		exec("cat " + WORKSPACE + "/stderr", function(err, stdout, stderr){
			return res.send(stdout);
		});
	}

	return this;
};

module.exports = new irConfigurationController();
