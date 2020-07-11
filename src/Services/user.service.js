import constants from "../Shared/Util/Constants"

/**
 * This service create a http request to the users api.
 */

class UserService {
	constructor() {
		this.url = `${constants.serverUrl}/users/`;
	}

	_crateRequest( values, url ) {
		console.log( "jdfkksdfjhksdhfd" );
		return fetch( url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify( values )
		} ).then( ( res ) => {
			if ( res.status >= 300 || res.status < 200 ) {
				const requestFailed = new Error();
				requestFailed.response = res;
				throw requestFailed;
			}
			console.log( res );
			return res.json();
		} ).then( json => json.token )
	}

	login = ( values ) => {
		return this._crateRequest( values, `${this.url}login` );
	}

	register = ( values ) => {
		return this._crateRequest( values, `${this.url}register` );
	}

}

export default new UserService();