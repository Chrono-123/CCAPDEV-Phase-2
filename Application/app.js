const express = require('express');
const path = require('path');
const routes = requires('./routes.js');
const db = requires('./db.js');

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({
    extended: true
});
app.use('/', routes);


app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

