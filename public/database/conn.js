import { MongoClient } from "mongodb";

const mongoURI = "mongodb://localhost:27017";
const client = new MongoClient(mongoURI);

export function connectToMongo (callback) {
    client.connect().then( (client) => {
        return callback();
    }).catch( error => {
        callback(error);
    })
}

export function getDb(dbName = process.env.DB_NAME) {
    return client.db(dbName);
}

function signalHandler() {
    console.log("Closing MongoDB connection...");
    client.close();
    process.exit();
}

process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);
