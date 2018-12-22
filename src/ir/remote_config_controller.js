'use strict'

function remoteConfigController(){
	var exec = 	require('child_process').exec;

	var remoteConfigs = require("../lib/db/remote_configs.js")
	var devices = require("../lib/db/devices.js")


	this.getAllConfigs = function(req, res, next){
		console.log("Getting all configs");
		remoteConfigs.getAllConfigs(function(configs){
			return res.send(configs);
		});
	};

	this.getOneConfig = function(req, res, next){
		remoteConfigs.getOneConfig(req.params.id, function(config){
			return res.send(config)
		});
	};

	this.addConfig = function(req, res, next){
		remoteConfigs.addConfig(req.params);
		return res.send(201);
	};

	this.deleteConfig = function(req, res, next){
		remoteConfigs.getOneConfig(req.params.id, function(config){
			var configName = config.name
			
			remoteConfigs.deleteOneConfig(req.params.id, function(result){
				devices.deleteManyDevices({"config" : req.params.id}, function(result){
					
					let command = "/usr/bin/python /opt/jack/src/lib/configuration/delete.py " + configName;

					exec(command, function(err, stdout, stderr){
						
						console.log("Delete Configuration (out): " + stdout);
						console.log("Delete Configuration (err): " + stderr);

					}).on("exit", function(code){
						
						return res.send({"status":code})

					});
				});
			});
		});
	};
}


module.exports = new remoteConfigController();
