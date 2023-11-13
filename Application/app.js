const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = requires('./routes.js');
const server = requires('./public/javascript/database/server.js');

const port = 3000;

const app = express();

const url = 'mongodb+srv://grantvillamor04:zH1nSlCxTr93sYSS@cluster0.rz5d7np.mongodb.net/'

async function connect() {
    try{
        await mongoose.connect(url);
    }catch(error){
        console.log(error);
    }
}

connect();

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
});
app.use(bodyParser.urlencoded({
    extended:true
});
app.use(bodyParser.json());

app.use('/', routes);




app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

