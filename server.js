// dependencies
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// setting up server and express
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use(routes);

// db connection event listener; starts server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server up on port:  ${PORT}  `);
  });
});
