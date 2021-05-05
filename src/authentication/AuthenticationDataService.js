import axios from 'axios'

class AthenticationDataService{

    login(phone, password){
        
        let basicAuthHeader = 'Basic ' + window.btoa(phone + ":" + password);

        return axios.get(`http://localhost:8080/api/v1/login/${phone}`, {headers: {authorization: basicAuthHeader}});
    }

}

export default new AthenticationDataService();