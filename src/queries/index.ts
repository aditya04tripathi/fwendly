import axios from "axios";

export default axios.create({
	baseURL: "http://localhost:6969",
});

export * from "./user";
export * from "./course";
