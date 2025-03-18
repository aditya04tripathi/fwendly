import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import userRoutes from "./modules/user/routes.js";
import courseRoutes from "./modules/course/routes.js";
import eventRoutes from "./modules/events/routes.js";
import eventTypesRoutes from "./modules/event-types/routes.js";
import unitRoutes from "./modules/units/routes.js";
import tagRoutes from "./modules/tags/routes.js";
import studentTypeRoutes from "./modules/studentType/routes.js";
import interestRoutes from "./modules/interests/routes.js";
import freeSlotRoutes from "./modules/freeSlots/routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 6969;
const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req, res) => {
	res.json({
		message: "API is working",
	});
});

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/event-types", eventTypesRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/student-types", studentTypeRoutes);
app.use("/api/interests", interestRoutes);
app.use("/api/free-slots", freeSlotRoutes);

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
