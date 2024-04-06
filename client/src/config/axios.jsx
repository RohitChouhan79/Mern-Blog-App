import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,
});

export default instance;

// https://mern-blog-server-git-master-rohitchouhan79s-projects.vercel.app/
// http://localhost:3000/