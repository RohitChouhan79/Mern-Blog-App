import axios from "axios";

const instance = axios.create({
    baseURL: "https://mern-blog-server-two.vercel.app/",
    withCredentials: true,
});

export default instance;