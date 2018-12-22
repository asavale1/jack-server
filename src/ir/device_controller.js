'use strict'

function deviceController(){
	var devices = require("../lib/db/devices.js")

	this.getAllDevices = function(req, res, next){
		devices.getAllDevices(function(layouts){
			return res.send(layouts);
		});
	};

	this.getOneDevice = function(req, res, next){
		devices.getOneDevice(req.params.id, function(device){
			console.log("Device: " + device);
			if(device == null){
				return res.send(404)
			}else{
				return res.send(device)
			}
		});
	};

	this.addDevice = function(req, res, next){
		devices.addDevice(req.params);
		return res.send(201);
	};

	this.deleteDevice = function(req, res, next){
		devices.deleteOneDevice(req.params.id, function(status){
			return res.send(200);
		});
	}
}


module.exports = new deviceController();
