import axios from 'axios'

class ProductListDataService {

    retrieveAllProducts(query) {
        return axios.get(`http://localhost:8080/api/v1/product/search?query=${query}`);
    }

}

export default new ProductListDataService();