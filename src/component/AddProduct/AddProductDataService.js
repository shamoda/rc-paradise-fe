import axios from 'axios'

class AddProductDataService{

    uploadProduct(product){
        return axios.post('http://localhost:8080/api/v1/product/add', product);
    }

    updateProduct(product){
        return axios.put('http://localhost:8080/api/v1/product/update', product);
    }

    getProduct(productId){
        return axios.get(`http://localhost:8080/api/v1/product/${productId}`);
    }

}

export default new AddProductDataService();