import axios from '../Axios/axios';

/**
 * This service create a http request to the users api.
 */

class ProductService {
	constructor() {
		this.storeUrl = `/store`;
		this.productUrl = '/products'
	}

	async addProduct( formData, token ) {
		await axios.post( `${this.storeUrl}/addProduct`, formData, {
			headers: {
				'Content-Type':  'multipart/form-data',
				'Authorization': `Bearer ${token}`
			},
		} );
	}

	async getProduct( { sn, storeID } ) {
		const res = await axios.get( `${this.productUrl}/getProduct?sn=${sn}&storeID=${storeID}` );
		return res.data;
	}
}

export default new ProductService();