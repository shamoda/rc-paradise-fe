import axios from 'axios'

class ProductDataService{

    retrieveProducts(id){
        return axios.get(`http://localhost:8080/api/v1/product/${id}`);
    }

}

export default new ProductDataService();