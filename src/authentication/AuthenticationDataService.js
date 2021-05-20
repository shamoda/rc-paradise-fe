import axios from 'axios'

class AthenticationDataService {

    login(phone, password) {

        let basicAuthHeader = 'Basic ' + window.btoa(phone + ":" + password);

        return axios.get(`http://192.168.43.164:8280/user/${phone}`, { headers: { authorization: basicAuthHeader } });
    }

}

export default new AthenticationDataService();