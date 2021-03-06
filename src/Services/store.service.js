import axios from '../Axios/axios'

/**
 * This service create a http request to the users api.
 */

class StoreService {
  constructor () {
    this.url = `/store`
  }

  async addStore (formData, token) {
    await axios.post(`${this.url}/addStore`, formData, {
      headers: {
        'Content-Type':  'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    })
  }

  async deleteStore (data, token) {
    await axios.post(`${this.url}/deleteStore`, data, {
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
  };

  async editStore (data, token) {
    await axios.post(`${this.url}/editStore`, data, {
      headers: {
        'Content-Type':  'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    })
  };

  async getStoresByUser (token) {
    const res = await axios.get(`${this.url}/getStoresByUser`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.data
  }

  async getOwner (storeID) {
    const res = await axios.get(`${this.url}/getOwner?storeID=${storeID}`)
    return res.data
  }

  async getStoreProducts ({ storeID }) {
    const res = await axios.get(`${this.url}/getStore/?storeID=${storeID}`)
    console.log(res)
    return res.data.products
  }

  async getStore ({ storeID }) {
    const res = await axios.get(`${this.url}/getStore/?storeID=${storeID}`)
    console.log(res)
    return res.data
  }

  async getTopStores () {
    const res = await axios.get(`${this.url}/getTopStores`)
    return res.data
  }
}

export default new StoreService()