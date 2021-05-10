import axios from 'axios'

class EmailService {

    sendEmail(email) {


        return axios.post('http://localhost:8080/api/v1/sendingEmail', email)


    }

}

export default new EmailService();