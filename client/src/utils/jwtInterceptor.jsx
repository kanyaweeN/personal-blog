import axios from "axios";

function jwtInterceptor() {
    axios.interceptors.request.use((req) => {
        const hasToken = Boolean(window.localStorage.getItem("token"));

        if (hasToken) {
            req.headers = {
                ...req.headers,
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            };
        }
        console.log("jwtInterceptor", req);

        return req;
    });

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log("=== JWT INTERCEPTOR ERROR ===", error.response);
            if (
                error.response &&
                error.response.status === 401 &&
                error.response.data.error.includes("Unauthorized")
            ) {
                console.log("=== JWT INTERCEPTOR REDIRECTING ===");
                window.localStorage.removeItem("token");
                // window.location.replace("/"); // คอมเมนต์ไว้ก่อน
            }
            return Promise.reject(error);
        }
    );
}

export default jwtInterceptor;

