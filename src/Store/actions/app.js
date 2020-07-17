import axios from "axios";
import * as actionsTypes from "./actionTypes";
//TODO : remove - only for practice
export const shahar = ( name ) => {
	return {
		type:          actionsTypes.SHAHAR_TEST,
		shaharMessage: name
	}
}

//TODO : remove - only for practice
export const test = () => {
	return {
		type:    actionsTypes.TEST,
		message: "Hello World...."
	}
};

export const startAction = () => {
	return {
		type: actionsTypes.START_ACTION,
	};
};

export const finishAction = () => {
	return {
		type: actionsTypes.FINISH_ACTION,
	};
};

export const authSuccess = ( token ) => {
	return {
		token: token,
		type:  actionsTypes.AUTH_SUCCESS,
	};
};

export const authFail = ( err ) => {
	return {
		error: err,
		type:  actionsTypes.AUTH_FAIL,
	};
};

export const authLogout = () => {
	localStorage.removeItem( "token" );
	localStorage.removeItem( "expirationDate" );

	return {
		token: null,
		type: actionsTypes.AUTH_LOGOUT,
	};
};

export const setAuthincationTimeOut = ( experationTime ) => {
	return ( dispatch ) => {
		setTimeout( () => {
			dispatch( authLogout() );
		}, experationTime );
	};
};

export const setUser = ( user ) => {
	return {
		user: user,
		type: actionsTypes.SET_USER
	};
}

// This mehtod get userAuthInfo as object that holds all the information you need in order to loging "email, password, ..."
// export const login = ( userAuthInfo ) => {
// 	return async ( dispatch ) => {
// 		dispatch( startAction() );
// 		const data = new FormData();
//
// 		data.append( "email", userAuthInfo.email );
// 		data.append( "password", userAuthInfo.password );
//
// 		try {
// 			const url = "Enter the route of loging in your server";
// 			const res = await axios.post( url, data );
// 			// I printed the result from the server so check what you need
// 			// and how the res object looks like.
// 			console.log( res );
//
// 			// I need to create a date, so I can limit the time  user can be logged in.
// 			// First I calculate the date I want the user to be loggedout auto.
// 			const expirationDate = new Date(
// 				new Date().getTime() + res.data.expirationTimeInMiliSeconds
// 			);
//
// 			//Now I calculatint the time I want him to be loggedout so i can use it in the setTimeout function.
// 			const timeToLoggout = expirationDate.getTime() - new Date().getTime();
//
// 			// Here I know that everything went well so i will save the token in the local storage
//
// 			localStorage.setItem( "token", res.data.token );
// 			localStorage.setItem( "expirationDate", expirationDate );
//
// 			dispatch( setAuthincationTimeOut( timeToLoggout ) );
// 			dispatch( authSuccess( res.data.token ) );
// 			dispatch( finishAction() );
// 		} catch ( err ) {
// 			// It is important for you to check what you are sending as error
// 			// So I am printinf the error
// 			// Send the object or massege you want to save in the reducer
// 			console.log( err );
// 			dispatch( authFail( err ) );
// 		}
// 	};
// };

export const checkState = () => {
	return async ( dispatch ) => {
		const token = localStorage.getItem( "token" );
		if ( !token ) {
			dispatch( authLogout() );
		} else {
			const expirationDate = new Date( localStorage.getItem( "expirationDate" ) );
			if ( expirationDate <= new Date() ) {
				dispatch( authLogout() );
			} else {
				dispatch( authSuccess( token ) );
				const timeToLoggout = expirationDate.getTime() - new Date().getTime();
				dispatch( setAuthincationTimeOut( timeToLoggout ) );
			}
		}
	};
};
