import constants from "../Shared/Util/Constants"
import axios from '../Axios/axios';

/**
 * This service create a http request to the users api.
 */

class ProductService {
	constructor() {
		this.url = `/store/addStore`;
	}

	async addStore( formData ) {
		let res = await axios.post(this.url, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	}
}

export default new ProductService();