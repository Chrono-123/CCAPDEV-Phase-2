const express = require('express');
const fs = require('fs');
const path = require('path');

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname + '/html')));

app.use(express.json());

app.get('/', function(req, res){
    res.send('main')
});


app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

