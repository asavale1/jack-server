'use strict'

function remoteDesignController(){
	var remoteDesigns = require("../lib/db/remote_designs.js")
	var devices = require("../lib/db/devices.js")

	this.getAllDesigns = function(req, res, next){
		remoteDesigns.getAllDesigns(function(designs){
			return res.send(designs);
		});
	};

	this.getOneDesign = function(req, res, next){
		remoteDesigns.getOneDesign(req.params.id, function(design){
			return res.send(design)
		});
	};

	this.addDesign = function(req, res, next){
		remoteDesigns.addDesign(req.params);
		return res.send(201);
	};

	this.deleteDesign = function(req, res, next){
		remoteDesigns.deleteOneDesign(req.params.id, function(result){
			devices.deleteManyDevices({"design" : req.params.id}, function(result){
				return res.send(200);
			});
		});
	};
}


module.exports = new remoteDesignController();
