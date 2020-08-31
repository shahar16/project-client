import axios from "../Axios/axios";
import constants from "../Shared/Util/Constants"

/**
 * This service create a http request to the users api.
 */

class UserService {
	constructor() {
		this.url = `${constants.serverUrl}/users/`;
	}

	_crateRequest( values, url ) {
		return fetch( url, {
			method:  "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body:    JSON.stringify( values )
		} ).then( ( res ) => {
			if ( res.status >= 300 || res.status < 200 ) {
				const requestFailed = new Error();
				requestFailed.response = res;
				throw requestFailed;
			}
			console.log( res );
			return res.json();
		} ).then( json => {
			return {
				token:                    json.token,
				user:                     json.user,
				expiresTimeInMiliseconds: json.expiresTimeInMiliseconds
			}
		} )
	}

	login = ( values ) => {
		return this._crateRequest( values, `${this.url}login` );
	}

	register = ( values ) => {
		return this._crateRequest( values, `${this.url}register` );
	}

	writeToLocalStorage( token, expiresTimeInMiliseconds, user ) {
		const expirationDate = new Date(
			new Date().getTime() + expiresTimeInMiliseconds
		);
		localStorage.setItem( "token", token );
		localStorage.setItem( "expirationDate", expirationDate.toLocaleString() );
		localStorage.setItem( "user", JSON.stringify( user ) );
	}

	async updateUser( data, token ) {
		const res = await axios.post( `${this.url}/editUser`, data, {
			headers: {
				'Content-Type':  'application/json',
				'Authorization': `Bearer ${token}`
			},
		} );

		return res.data;
	}

	async addToCart(data, token) {
		await axios.post(`${this.url}addtocart`, data, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		});
	};

}

export default new UserService();