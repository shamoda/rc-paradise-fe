import axios from 'axios'

class RegistrationDataService {

    registerUser(user) {
        return axios.post('http://192.168.43.164:8280/user/user', user);
    }

}

export default new RegistrationDataService();