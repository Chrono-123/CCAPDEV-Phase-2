import 'dotenv/config';

import { connectToMongo, getDb } from './conn.js';

console.log(connectToMongo);
console.log(getDb);

connectToMongo((error) => {
    
    console.log("Connected to MongoDB server")

    if (error) {
        console.log("error occured:");
        console.error(error);
        process.exit();
    }

    console.log("Connected to MongoDB server")

    const db = getDb();
})