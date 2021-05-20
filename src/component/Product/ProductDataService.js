import axios from 'axios'

class ProductDataService {

    retrieveProducts(productId) {
        return axios.get(`http://192.168.43.164:8280/products/${productId}`);
    }

}

export default new ProductDataService();