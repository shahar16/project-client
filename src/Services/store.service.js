import axios from '../Axios/axios';

/**
 * This service create a http request to the users api.
 */

class ProductService {
	constructor() {
		this.url = `/store`;
	}

	async addStore( formData ) {
		let res = await axios.post( `${this.url}/addStore`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		} );
	}

	async deleteStore( data ) {
		let res = await axios.post( `${this.url}/deleteStore`, data, {
			headers: { 'Content-Type': 'application/json' },
		} );
	};
}

export default new ProductService();