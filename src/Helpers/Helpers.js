import axios from "axios";

class adminPanel {
  constructor() {
    this.baseUrl = "http://31.97.36.101:3000/api/";
  }

  api() {
    const axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": "az",
      },
      withCredentials: true,
    });
    let count = 0;
    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && count++ < 2) {
          console.error(error.response);
          try {
            await axiosInstance.post("/auth/refresh");
            return axiosInstance.request(error.config);
          } catch (refreshError) {
            console.error("Session expired", refreshError);
            // window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }
}

const ziraGulAdminPanel = new adminPanel();

export default ziraGulAdminPanel;
