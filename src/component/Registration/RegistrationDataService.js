import axios from 'axios'

class RegistrationDataService {

    registerUser(user){
        return axios.post('http://localhost:8080/api/v1/register/user', user);
    }

}

export default new RegistrationDataService();