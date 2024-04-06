const express = require('express');
const bodyParser = require('body-parser');
const fs = require('node:fs');
const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(express.json());

if (!fs.existsSync('./db/db.json')) {
    fs.writeFileSync('./db/db.json', JSON.stringify([]));
}

app.post('/submit', (req, res) => {
    let db = JSON.parse(fs.readFileSync('./db/db.json'));

    db.push(req.body.data);

    fs.writeFileSync('./db/db.json', JSON.stringify(db));

    res.status(200);
    res.send();
});

app.get('/list', (req, res) => {
    let db = JSON.parse(fs.readFileSync('./db/db.json'));
    res.send(db);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});