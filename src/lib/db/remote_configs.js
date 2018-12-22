'use strict'

function remoteConfigs(){
	var MONGO_URL = "mongodb://localhost:27017/jack"
	var COLLECTION = "RemoteConfigs";

	var MongoClient = require('mongodb').MongoClient;
	var ObjectID = require('mongodb').ObjectID;

	var assert = require('assert');

	this.getAllConfigs = function(callback){
		console.log("Getting all Remote Configs");
		MongoClient.connect(MONGO_URL, function(err, db) {
			assert.equal(null, err);
			db.collection(COLLECTION).find({}).toArray(function(err, result) {
				assert.equal(err, null);
				console.log(result);
				db.close();
				callback(result);
			});
		}); 
	};

	this.addConfig = function(remoteConfiguration){
		console.log("Add Remote Config");
		console.log(remoteConfiguration);

		MongoClient.connect(MONGO_URL, function(err, db) {
			assert.equal(null, err);
			db.collection(COLLECTION).insertOne(remoteConfiguration, function(err, result) {
				assert.equal(err, null);
				console.log("Inserted a document into the "+ COLLECTION +" collection.");
				db.close();
			});
		});
	};

	this.getOneConfig = function(id, callback){
		MongoClient.connect(MONGO_URL, function(err, db){
			assert.equal(null, err);

			console.log("Getting One Config: " + id);
			var o_id = new ObjectID(id);

			db.collection(COLLECTION).findOne({"_id": o_id}, function(err, result){
				assert.equal(err, null);
				db.close();
				callback(result);
			});
		});
	};

	this.deleteOneConfig = function(id, callback){
		console.log("Delete config " + id);
		MongoClient.connect(MONGO_URL, function(err, db){
			assert.equal(null, err);

			var o_id = new ObjectID(id);

			db.collection(COLLECTION).deleteOne({"_id" : o_id}, function(err, result) {
				assert.equal(err, null);
				db.close();
				callback(result);
			});
		});
	}
};

module.exports = new remoteConfigs();
