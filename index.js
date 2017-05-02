const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const express = require('express');

const app = express();

var db;

MongoClient.connect('mongodb://admin:antonyq5909@ds127731.mlab.com:27731/devit', (err, database) => {
    if (err) return console.log(err);
    db = database;
    app.listen(process.env.PORT || 3000, () => {
        console.log('listening on 3000');
    });
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/src'));
app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.render(__dirname + '/src/views/pages/index.ejs', {quotes: result});
    });
});

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('saved to database');
        res.redirect('/');
    });
});
