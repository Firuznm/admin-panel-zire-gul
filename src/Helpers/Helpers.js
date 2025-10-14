class adminPanel {
  constructor() {
    this.baseUrl = "https://azergold-api.looptech.az/api/";
    this.count = 0;
  }

  api() {
    const defaultHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": "az",
    };

    const request = async (endpoint, options = {}) => {
      const url = `${this.baseUrl}${endpoint}`;
      const config = {
        method: options.method || "GET",
        headers: { ...defaultHeaders, ...(options.headers || {}) },
        credentials: "include",
        body: options.data ? JSON.stringify(options.data) : undefined,
      };

      try {
        let response = await fetch(url, config);

        if (response.status === 401 && this.count++ < 1) {
          console.warn("401 Unauthorized, trying refresh...");
          try {
            await fetch(`${this.baseUrl}auth/refresh`, {
              method: "POST",
              headers: defaultHeaders,
              credentials: "include",
            });
            response = await fetch(url, config);
            const data = await response.json();
            if (!response.ok) throw { response, data };
          } catch (refreshError) {
            console.error("Session expired", refreshError);
            window.location.href = "/login";
          }
        }

        const data = await response.json();
        if (!response.ok) throw { response, data };
        return { data };
      } catch (error) {
        console.log("Error -- ", error);
        return Promise.reject(error);
      }
    };

    return {
      get: (url, options) => request(url, { ...options, method: "GET" }),
      post: (url, data, options) =>
        request(url, { ...options, method: "POST", data }),
      put: (url, data, options) =>
        request(url, { ...options, method: "PUT", data }),
      delete: (url, options) => request(url, { ...options, method: "DELETE" }),
    };
  }
}

const ziraGulAdminPanel = new adminPanel();

export default ziraGulAdminPanel;
