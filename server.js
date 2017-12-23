const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const MongoClient = require('mongodb').MongoClient;
const routes = require('./routes');
const { MONGO_DB_DATABASE } = require('./config');

MongoClient.connect(MONGO_DB_DATABASE, (err, database) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Database successfully connected');
});

const app = express();

app.use(helmet());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`PAYIMBOT listening on port ${port}`));
