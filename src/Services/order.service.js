import axios from '../Axios/axios';

class OrderService {
    constructor() {
        this.url = `/users`;
    }

    async getUserOrders(token) {
        console.log(`${token}`)
        const res = await axios.get(`${this.url}/getUserOrders`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res.data;
    }
}

export default new OrderService();