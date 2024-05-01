const express = require('express');
const bodyParser = require('body-parser');
const fs = require('node:fs');
const app = express();
const port = 3000;

const { MongoClient } = require('mongodb');

const mongodbURL = 'mongodb://mongodb:27017';
const dbName = 'todo'; 

const mongoClient = new MongoClient(mongodbURL);

const db = mongoClient.db(dbName);
const collection = db.collection('todo');

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(express.json());

//if (!fs.existsSync('./db/db.json')) {
//    fs.writeFileSync('./db/db.json', JSON.stringify([]));
//}

app.post('/submit', async (req, res) => {
    // let db = JSON.parse(fs.readFileSync('./db/db.json'));

    // db.push(req.body.data);

    // fs.writeFileSync('./db/db.json', JSON.stringify(db));
    await collection.insertOne(req.body);
    res.status(200);
    res.send();
});

app.get('/list', async (req, res) => {
    const list = await collection.find().toArray();
    console.log(list);
    res.send(list);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
