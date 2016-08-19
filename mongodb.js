/**
 * Created by jiayanguo on 8/18/16.
 */
//lets require/import the mongodb native drivers.

'use strict'
const mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
const MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
const url = 'mongodb://localhost:27017/test';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);

        // Get the documents collection
        let collection = db.collection('users');

        // Insert some users
        collection.find({username: 'gjy'}).toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else if (result.length) {
                console.log('Found:', result);
            } else {
                console.log('No document(s) found with defined "find" criteria!');
            }
            //Close connection
            db.close();
            console.log("db connection closed.")
        });
    }
});
