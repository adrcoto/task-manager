/*const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;*/

const { MongoClient} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';



MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => {
    if (error)
        return console.log('Unable to connect to: ' + databaseName);
    console.log('Connected successfully to: ' + databaseName);

    const db = client.db(databaseName);

    /**
     * Create -> Insert data to database
     */
    /* db.collection('users').insertOne({
     name: 'Black',
     age: 25
     });*/
    /* const tasks = [
     {
     name: 'Learning Node',
     description: 'Building a task manager app using node.js and mongodb',
     completed: false,
     },
     {
     name: 'Go home',
     description: 'Need to go home, corona is coming for us all',
     completed: false
     },
     {
     name: 'Eat',
     description: 'Nada',
     completed: true
     }
     ];*/
    /*db.collection('tasks').insertMany(tasks, (error, result) => {
     if (error)
     return console.log('Unable to insert documents.');
     console.log(result.ops);
     });*/

    /**
     * Read -> Get data from database
     */

    db.collection('users').findOne({name: 'Rhodes'}, (error, user) => {
        if (error)
            return console.log('Error searching for requested document.');
        if (!user)
            return console.log('Unable to find requested document.');
        console.log(user);
    });

    db.collection('tasks').find({completed: false}).toArray((error, users) => {
        if (error)
            return console.log('Error searching for requested documents.');
        if (!users)
            return console.log('Unable to find requested documents.');

        console.log(users.length);
    });

    db.collection('tasks').find({completed: false}).count((error, users) => {
        if (error)
            return console.log('Error searching for requested documents.');
        if (!users)
            return console.log('Unable to find requested documents.');

        console.log(users);
    });

});
