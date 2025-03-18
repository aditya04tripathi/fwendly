import axios from "axios";

const instance = axios.create({
	baseURL: "https://api.menmattertoo.space",
});

export default instance;
