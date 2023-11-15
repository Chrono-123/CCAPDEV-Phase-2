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
    // const data = {fname, lname, birth, user, password} = req.body;
    db.collection("test").insertOne({
        firstName: "Sean",
        lastName: "Lim",
        dateOfBirth: "11/10/01",
        userName: "Jesus",
        password: "Iamjesus"
    }).then(val => {
        console.log("Insert successful: ");
        console.log(val);
    }).catch(error => {
        console.log("Insert op error: " + error);
    });
});