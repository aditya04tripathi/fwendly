import axios from "axios";

const instance = axios.create({
	baseURL: "https://api.menmattertoo.space",
});

export default instance;

export * from "./course";
export * from "./event";
export * from "./eventType";
export * from "./freeSlots";
export * from "./interest";
export * from "./studentType";
export * from "./tag";
export * from "./unit";
export * from "./user";
