const express = require('express');
const fs = require('fs');

const port = 3000;

const app = express();

app.use(express.static('html'));

app.use(express.json());




app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

