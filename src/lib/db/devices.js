'use strict'

function devices(){
	var MONGO_URL = "mongodb://localhost:27017/jack"
	var COLLECTION = "Devices";

	var MongoClient = require('mongodb').MongoClient;
	var ObjectID = require('mongodb').ObjectID;

	var assert = require('assert');

	this.getAllDevices = function(callback){
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

	this.getOneDevice = function(id, callback){
		MongoClient.connect(MONGO_URL, function(err, db){
			assert.equal(null, err);
			console.log("Getting One Device: " + id);
			var o_id = new ObjectID(id);

			db.collection(COLLECTION).findOne({"_id" : o_id}, function(err, result){
				console.log('Error');
				console.log(err)
				console.log("Result");
				console.log(result);

				assert.equal(err, null);
				db.close();
				callback(result);
			});
		});
	};

	this.addDevice = function(device){
		console.log("Add Device");
		console.log(device);
		MongoClient.connect(MONGO_URL, function(err, db) {
			assert.equal(null, err);
			db.collection(COLLECTION).insertOne(device, function(err, result) {
				assert.equal(err, null);
				console.log("Inserted a document into the "+ COLLECTION +" collection.");
				db.close();
			});
		});
	};

	this.deleteOneDevice = function(id, callback){
		console.log("Delete One Device: " + id);
		
		MongoClient.connect(MONGO_URL, function(err, db){
			assert.equal(null, err);
			var o_id = new ObjectID(id);

			db.collection(COLLECTION).deleteOne({"_id" : o_id}, function(err, result){
				assert.equal(err, null);
				db.close();
				callback(result);
			});
		});
	};

	this.deleteManyDevices = function(query, callback){
		console.log("Delete Many Devices: " + query);
		MongoClient.connect(MONGO_URL, function(err, db){
			assert.equal(null, err);
			db.collection(COLLECTION).remove(query, function(err, result){
				assert.equal(err, null);
				db.close();
				callback(result);
			});
		});
	};

};

module.exports = new devices();