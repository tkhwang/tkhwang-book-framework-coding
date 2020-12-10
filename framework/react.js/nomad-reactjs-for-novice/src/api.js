import axios from "axios"

const http = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
})

http.get("tv/2333", {
	params: {
		api_key: process.env.REACT_APP_API_KEY, // "12df8a0602abd729ec3ab25cd16cdab0",
		language: "en-US",
	},
})

export default http
