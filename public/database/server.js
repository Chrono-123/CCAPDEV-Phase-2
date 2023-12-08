const mongoose = require('mongoose');

function connect(){
    return mongoose.connect(process.env.MONGODB_URI);
}

function signalHandler() {
    console.log("Closing MongoDB connection...");
    client.close();
    process.exit();
}

process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);

module.exports = connect;