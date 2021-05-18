import axios from 'axios'

class SmsDataService {

    sendEmail(user) {
        return axios.post(`http://localhost:8080/api/v1/sendSMS`, user);
    }



}
export default new SmsDataService();