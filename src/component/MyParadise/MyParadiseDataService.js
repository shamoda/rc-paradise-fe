import axios from 'axios'

class MyParadiseDataService{

    retrieveAllProductsBySeller(sellerId, query){
        return axios.get(`http://localhost:8080/api/v1/product/seller?sellerId=${sellerId}&query=${query}`);
    }

    deleteProduct(productId){
        return axios.delete(`http://localhost:8080/api/v1/product/delete/${productId}`);
    }

}

export default new MyParadiseDataService();