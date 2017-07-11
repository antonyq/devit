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
app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');

// app.all('*', (req, res, next) => {
//     next();
// });

app.get('/:lang?/:page?', (req, res) => {
    res.render(`${__dirname}/src/views/pages/${req.params.page || 'index'}.ejs`, getDefaultDataObject(req));
});

function getLang (req) {
    let match = req.url.match(/^\/([A-Z]{2})([\/\?].*)?$/i);
    return match ? match[1] : config.defaultLang;
}

function getLocation (req) {
    console.log(req.route);
    return req.route;
}

function getDefaultDataObject (req) {
    let lang = getLang(req);
    return {
        siteName: config.siteName,
        location: getLocation(req),
        language: lang,
        localization: {
            meta: {
                title: 'DevIT',
                description: 'Все курсы IT в Укарине',
                keywords: ['курсы', 'IT', 'Украина', 'программирование', 'тестирование', 'управление']
            },
            header: require(`./src/localization/${lang}/header.json`),
            footer: require(`./src/localization/${lang}/footer.json`)
        }
    }
}
