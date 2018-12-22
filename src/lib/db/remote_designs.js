'use strict'

function remoteDesigns(){
	var MONGO_URL = "mongodb://localhost:27017/jack"
	var COLLECTION = "RemoteDesigns";

	var MongoClient = require('mongodb').MongoClient;
	var ObjectID = require('mongodb').ObjectID;

	var assert = require('assert');

	this.getAllDesigns = function(callback){
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

	this.getOneDesign = function(id, callback){
		MongoClient.connect(MONGO_URL, function(err, db){
			assert.equal(null, err);
			console.log("Getting One Design: " + id);
			var o_id = new ObjectID(id);

			db.collection(COLLECTION).findOne({"_id" : o_id}, function(err, result){
				assert.equal(err, null);
				db.close();
				callback(result);
			});
		});
	};

	this.addDesign = function(remoteDesign){
		console.log("Add Remote Design");
		console.log(remoteDesign);
		MongoClient.connect(MONGO_URL, function(err, db) {
			assert.equal(null, err);
			db.collection(COLLECTION).updateOne({"name" : remoteDesign.name}, remoteDesign, {upsert:true}, function(err, result) {
				assert.equal(err, null);
				console.log("Inserted a document into the "+ COLLECTION +" collection.");
				db.close();
			});
		});
	};

	this.deleteOneDesign = function(id, callback){
		console.log("Delete Remote Design: " + id);
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

};

module.exports = new remoteDesigns();
