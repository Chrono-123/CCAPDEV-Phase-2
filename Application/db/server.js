import 'dotenv/config';

import { connectToMongo, getDb } from './db/conn.js';

connectToMongo((error) => {
    if (error) {
        console.log("error occured:");
        console.error(error);
        process.exit();
    }

    console.log("Connected to MongoDB server")

    const db = getDb();
})