import { MongoClient } from 'mongodb';

const url = process.env.url;
const client = new MongoClient(url)

export function connectToMongo (callBack) {
    client.connect(( error, client ) => {
        if (error || !client) {
            return callBack(error);
        }
        
        return callBack();
    });
}

// export function getDb(dbName = process.env.dbName) {
//     return client.db(dbName);
// }

// function signalHandler() {
//     console.log("Closing MongoDB connection...");
//     client.close();
//     process.exit();
// }

// process.on('SIGINT', signalHandler);
// process.on('SIGTERM', signalHandler);
// process.on('SIGQUIT', signalHandler);
