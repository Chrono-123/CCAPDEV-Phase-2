import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import routes from './routes.js';

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
			extended: true,
	})
);

app.use(routes);



app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

