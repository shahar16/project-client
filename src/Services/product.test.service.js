import constants from '../Shared/Util/Constants'

/**
 * This service create a http request to the users api.
 */

class ProductService {
  constructor () {
    this.url = `${constants.serverUrl}/products/getTestProduct?sn=`
    this.homePageUrl = `${constants.serverUrl}/products/getHomePageProducts?init=`
  }

  getProduct = (sn) => {
    console.log('rendering Store Gallery...')
    return fetch(`${this.url}${sn}`, {
      method:  'get',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      if (res.status >= 300 || res.status < 200) {
        const requestFailed = new Error()
        requestFailed.response = res
        throw requestFailed
      }
      // console.log(res);
      return res.json()
    })
  }

  getHomePageProducts = async (init) => {
    console.log(`${this.homePageUrl}${init}`)
    return fetch(`${this.homePageUrl}${init}`, {
      method:  'get',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      if (res.status >= 300 || res.status < 200) {
        const requestFailed = new Error()
        requestFailed.response = res
        throw requestFailed
      }
      console.log('res: ')
      console.log(res)
      return res.json()
    })
  }
}

export default new ProductService()