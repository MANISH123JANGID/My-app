// app.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = process.env.PORT || 3000;

// MongoDB URL and Database Name
const url = 'mongodb://localhost:27017'; // For local MongoDB
const dbName = 'mydatabase';

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log("Connected to MongoDB");
    const db = client.db(dbName);

    app.get('/', (req, res) => {
      db.collection('users').find().toArray()
        .then(results => {
          res.send(results);
        })
        .catch(error => res.status(500).send(error));
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch(error => console.error(error));
