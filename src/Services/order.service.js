import axios from '../Axios/axios'

class OrderService {
  constructor () {
    this.url = `/users`
  }

  async getUserOrders (token) {
    console.log(`${token}`)
    const res = await axios.get(`${this.url}/getUserOrders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.data
  }

  async getOrder (token, id) {
    const res = await axios.get(`${this.url}/getorder?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return res.data
  }
}

export default new OrderService()