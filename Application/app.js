import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";

const port = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
			extended: true,
	})
);
	
const routes = express.Router();





app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

