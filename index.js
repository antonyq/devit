const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();

const config = require('./src/config/config.js');

var db;

MongoClient.connect(config.connectionString, (err, database) => {
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
    res.render(__dirname + '/src/views/pages/index.ejs', {});
});

// app.post('/quotes', (req, res) => {
//     db.collection('quotes').save(req.body, (err, result) => {
//         if (err) return console.log(err);
//         console.log('saved to database');
//         res.redirect('/');
//     });
// });
