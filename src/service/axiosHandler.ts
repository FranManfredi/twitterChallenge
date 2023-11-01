import axios from "axios";

const axiosHandler = axios.create({
    baseURL: "http://localhost:8080/api"
});

axiosHandler.interceptors.request.use((config) => {
    try {
        config.headers.Authorization = localStorage.getItem("token");
        return config;
    }
    catch (err) {
        window.location.href = "/login";
        return config;
    }
});

axiosHandler.interceptors.response.use(
    (response) => {
        if (response == null) {
            window.location.href = "/login";
            return Promise.reject(response);
        }
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export { axiosHandler };