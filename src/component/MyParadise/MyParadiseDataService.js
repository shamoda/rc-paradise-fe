import axios from 'axios'

class MyParadiseDataService {

    retrieveAllProductsBySeller(sellerId, query) {
        return axios.get(`http://192.168.43.164:8280/products/seller?sellerId=${sellerId}&query=${query}`);
    }

    deleteProduct(productId) {
        return axios.delete(`http://192.168.43.164:8280/products/delete/${productId}`);
    }

}

export default new MyParadiseDataService();