import axios from "axios";


class adminPanel {
	constructor() {
		// this.lng = localStorage.getItem("lang") || "az",
	    this.baseUrl = "31.97.36.101:3000/api/";
        // this.baseUrlImage = "https://admin.ziraolives.az/storage/";
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    }
    api() {
        return axios.create({  
            baseURL: this.baseUrl,
            headers: this.headers,
        });
    }
}
	
const ziraGulAdminPanel = new adminPanel();

export default ziraGulAdminPanel;