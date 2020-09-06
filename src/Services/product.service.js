import axios from '../Axios/axios'

/**
 * This service create a http request to the users api.
 */

class ProductService {
  constructor () {
    this.storeUrl = `/store`
    this.productUrl = '/products'
  }

  async addProduct (formData, token) {
    await axios.post(`${this.storeUrl}/addProduct`, formData, {
      headers: {
        'Content-Type':  'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    })
  }

  async getProduct ({ sn, storeID }) {
    const res = await axios.get(`${this.productUrl}/getProduct?sn=${sn}&storeID=${storeID}`)
    return res.data
  }

  async editProduct (formData, token) {
    await axios.post(`${this.storeUrl}/editProduct`, formData, {
      headers: {
        'Content-Type':  'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    })
  }

  async deleteProduct (data, token) {
    await axios.post(`${this.storeUrl}/deleteProduct`, data, {
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
  }

  async getProductsNamesList () {
    const res = await axios.get(`${this.productUrl}/getProductsList`)
    return res.data
  }

  async search (query) {
    const res = await axios.get(`${this.productUrl}/search?searchQuery=${query}`)
    return res.data
  }
}

export default new ProductService()