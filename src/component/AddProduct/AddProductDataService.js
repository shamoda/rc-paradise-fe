import axios from 'axios'

class AddProductDataService {

    uploadProduct(product) {

        return axios.post('http://192.168.43.164:8280/products/add', product);
    }

    updateProduct(product) {
        return axios.put('http://192.168.43.164:8280/products/update', product);
    }

    getProduct(productId) {
        return axios.get(`http://192.168.43.164:8280/products/${productId}`);
    }

}

export default new AddProductDataService();