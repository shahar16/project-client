import axios from '../Axios/axios';

/**
 * This service create a http request to the users api.
 */

class StoreService {
	constructor() {
		this.url = `/store`;
	}

	async addStore( formData ) {
		await axios.post( `${this.url}/addStore`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		} );
	}

	async deleteStore( data ) {
		await axios.post( `${this.url}/deleteStore`, data, {
			headers: { 'Content-Type': 'application/json' },
		} );
	};

	async editStore( data ) {
		await axios.post( `${this.url}/editStore`, data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		} );
	};

	async getStoresByUser() {
		const res = await axios.get( `${this.url}/getStoresByUser` );
		return res.data;
	}
}

export default new StoreService();