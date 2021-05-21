import axios from 'axios'

class smsdataService {
    sendEmail(user) {
        return axios.post(`http://192.168.43.164:8280/cart/sendSMS`, user);
    }

    validateOTP(user) {
        return axios.post(`http://192.168.43.164:8280/cart/validateOTP`, user)
    }
}
export default new smsdataService();