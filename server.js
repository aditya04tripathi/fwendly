import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import userRoutes from "./modules/user/routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 6969;
const MONGO_URI = process.env.MONGO_URI;

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
	console.log("[INFO] Trying MongoDb connection...");
	mongoose
		.connect(MONGO_URI)
		.then(() => {
			console.log("[INFO] Connected to MongoDB");
		})
		.catch((error) => {
			console.log("[ERROR] Connection to MongoDB failed: ", error);
		})
		.then(() => {
			console.log(`[INFO] Server is running on port ${PORT}`);
		});
});
