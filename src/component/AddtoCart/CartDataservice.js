import axios from 'axios'

class CartDataservice {
    createCart(Cart) {
        return axios.post('http://localhost:8080/api/v1/Add', Cart)
    }

    getCart(sellerId) {
        return axios.get(`http://192.168.43.164:8280/cart/${sellerId}`);
    }
}
export default new CartDataservice();