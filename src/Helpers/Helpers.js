import axios from "axios";

class adminPanel {
    constructor() {
        this.baseUrl = "http://31.97.36.101:3000/api/";
    }

    api() {
        const token = localStorage.getItem("token"); 
        return axios.create({
            baseURL: this.baseUrl,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Accept-Language": "az",
                ...(token && { Authorization: `Bearer ${token}` }), 
            },
        });
    }
}

const ziraGulAdminPanel = new adminPanel();

export default ziraGulAdminPanel;
