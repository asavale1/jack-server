'use strict'

module.exports = function(server){
	var irController = require('./controller');
	var irConfigurationController = require("./configuration_controller");

	var remoteConfigController = require("./remote_config_controller");
	var remoteDesignController = require("./remote_design_controller");	
	var deviceController = require("./device_controller");

	server.post("/ir/send", irController.sendCommand);
	server.get("/ir/devices", irController.getDevices);
	server.get("/ir/:device/commands", irController.getDeviceCommands);
	server.get("/ir/commands", irController.getCommands);


	server.get("/ir/configuration/init", irConfigurationController.initConfiguration);
	server.post("/ir/configuration/send", irConfigurationController.sendCommand)
	server.get("/ir/configuration/terminate", irConfigurationController.terminateConfiguration);
	server.get("/ir/configuration/output", irConfigurationController.getOutput);
	server.get("/ir/configuration/error", irConfigurationController.getError);
	server.post("/ir/configuration/save", irConfigurationController.saveConfiguration);

	server.get("/ir/remote/config",  remoteConfigController.getAllConfigs);
	server.get("/ir/remote/config/:id", remoteConfigController.getOneConfig);
	server.post("/ir/remote/config", remoteConfigController.addConfig);
	server.del("/ir/remote/config/:id", remoteConfigController.deleteConfig);

	server.get("/ir/remote/design", remoteDesignController.getAllDesigns);
	server.get("/ir/remote/design/:id", remoteDesignController.getOneDesign);
	server.post("/ir/remote/design", remoteDesignController.addDesign);
	server.del("/ir/remote/design/:id", remoteDesignController.deleteDesign);


	server.get("/ir/device", deviceController.getAllDevices);
	server.get("/ir/device/:id", deviceController.getOneDevice);
	server.post("/ir/device", deviceController.addDevice);
	server.del("/ir/device/:id", deviceController.deleteDevice);



};