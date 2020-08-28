import React from 'react';
import { Image } from "react-bootstrap";
import ErrorImage from "../resources/images/error404.jpg"

function Error( props ) {
	return (
		<Image src={ErrorImage}/>
	);
}

export default Error;