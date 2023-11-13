const express = require('express');
const path = require('path');
const routes = requires('./routes.js');
const server = requires('./public/javascript/database/server.js');

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({
    extended: true
});
app.use('/', routes);

server.connect();


app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

