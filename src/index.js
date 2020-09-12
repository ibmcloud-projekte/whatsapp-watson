// external packages
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const routes = require('./routes');

// Server Port
const PORT = process.env.PORT;

// Initialize the webapp
const app = express();

// Webapp settings
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Home route
app.get('/', (req, res) => {
    res.send(`I am alive!`);
});

app.use(routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});
