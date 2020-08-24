import axios from '../Axios/axios';

/**
 * This service create a http request to the users api.
 */

class ProductService {
	constructor() {
		this.url = `/store`;
	}

	async addProduct( formData, token ) {
		await axios.post( `${this.url}/addProduct`, formData, {
			headers: {
				'Content-Type':  'multipart/form-data',
				'Authorization': `Bearer ${token}`
			},
		} );
	}

	async editProduct( formData, token ) {
		await axios.post( `${this.url}/editProduct`, formData, {
			headers: {
				'Content-Type':  'multipart/form-data',
				'Authorization': `Bearer ${token}`
			},
		} );
	}
}

export default new ProductService();