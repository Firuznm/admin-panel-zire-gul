import axios from "axios";


class adminPanel {
	constructor() {
	    this.baseUrl = "http://31.97.36.101:3000/api/";
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