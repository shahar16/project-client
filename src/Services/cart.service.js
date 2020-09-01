import axios from '../Axios/axios';

/**
 * This service create a http request to the users api.
 */

class StoreService {
	constructor() {
		this.url = `/users`;
	}

	async getCart( token ) {
		const res = await axios.get( `${this.url}/getcart`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		} );
		console.log( res );
		return res.data;
	}

	async updateItem( data, token ) {
		await axios.post( `${this.url}/editcartitems`, data, {
			headers: {
				'Content-Type':  'application/json',
				'Authorization': `Bearer ${token}`
			},
		} );
	}
}

export default new StoreService();