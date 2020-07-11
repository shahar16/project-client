import constants from "../Shared/Util/Constants"

/**
 * This service create a http request to the users api.
 */

class ProductService {
	constructor() {
		this.url = `${constants.serverUrl}/products/getTestProduct?sn=`;
	}

	getProduct = ( sn ) => {
		return fetch( `${this.url}${sn}`, {
			method:  "get",
			headers: {
				"Content-Type": "application/json"
			},
		} ).then( ( res ) => {
			if ( res.status >= 300 || res.status < 200 ) {
				const requestFailed = new Error();
				requestFailed.response = res;
				throw requestFailed;
			}
			// console.log(res);
			return res.json();
		} )
	}
}

export default new ProductService();