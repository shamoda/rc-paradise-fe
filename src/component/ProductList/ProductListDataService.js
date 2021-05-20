import axios from 'axios'

class ProductListDataService {

    retrieveAllProducts(query) {
        return axios.get(`http://192.168.43.164:8280/products/search?query=${query}`);
    }

}

export default new ProductListDataService();