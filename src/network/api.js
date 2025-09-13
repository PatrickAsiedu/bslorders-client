import axios from "axios";

let baseUrl;

process.env.NODE_ENV === "development"
  ? (baseUrl = "http://localhost:3001/api")
  : (baseUrl = "https://bslorders-server.onrender.com/api");

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: baseUrl,
});

//   check if there is a valid token in the localstorage
const token = localStorage.getItem("user_token");
if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  delete instance.defaults.headers.common["Authorization"];
}
// that's all,so if there's no token we not adding any auth to the headers

export default instance;
