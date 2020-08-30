import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, Image, Nav, Navbar } from "react-bootstrap";
import { Cart4, House, Shop, Search, Person } from "react-bootstrap-icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import img from "../resources/images/nav-bar-image.jpg";
import logo from "../resources/images/store-line-logo.png"
import Constants from "../Shared/Util/Constants";
import SearchBox from "./SearchBox";

function NavBar( props ) {
	let listener = null
	const [ scrollState, setScrollState ] = useState( "top" )

	const linkStyle = {
		"marginRight": "20px"
	}

	useEffect( () => {
		listener = document.addEventListener( "scroll", e => {
			let scrolled = document.scrollingElement.scrollTop
			if ( scrolled >= 375 ) {
				setScrollState( "full-opacity" )
			} else if ( scrolled >= 300 ) {
				setScrollState( "high-opacity" )
			} else if ( scrolled >= 200 ) {
				setScrollState( "mid-opacity" )
			} else if ( scrolled >= 100 ) {
				setScrollState( "low-opacity" )
			} else {
				setScrollState( "top" )
			}
		} )
		return () => {
			document.removeEventListener( "scroll", listener )
		}
	}, [ scrollState ] )

	const getStyle = () => {
		let style = {
			"backgroundSize": "100%",
		}

		switch ( scrollState ) {
			case "low-opacity":
				style["opacity"] = "25%";
				break;
			case "mid-opacity":
				style["opacity"] = "50%";
				break;
			case "high-opacity":
				style["opacity"] = "75%";
				break;
			case "full-opacity":
				style["opacity"] = "100%";
				break;
		}
		return style;
	}


	const getUserMessage = () => {
		if ( props.user ) {
			return `Hi ${props.user.firstName} ${props.user.lastName}`;
		} else {
			return <div>
				Hi, please <Link to="/login">Log in</Link> or <Link to="/signup">Sign Up</Link>
			</div>
		}
	}

	return (
		<div>
			<Image src={img} className="shadow" fluid/>
			<Navbar bg={scrollState === "top" ? "non" : "light"} variant="light" fixed="top"
					style={getStyle()} className="shadow">
				<Navbar.Brand href="#home">
					<img
						src={logo}
						height="70"
						className="d-inline-block align-top"
					/>
				</Navbar.Brand>
				<Nav className="mr-auto">
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text>
							{getUserMessage()}
						</Navbar.Text>
					</Navbar.Collapse>
				</Nav>
				<Link to="/" style={linkStyle}><House style={Constants.iconStyle}/>Home</Link>
				<Link to="/my-stores" style={linkStyle}><Shop style={Constants.iconStyle}/>My Stores</Link>
				<Link to="/my-cart" style={linkStyle}><Cart4 style={Constants.iconStyle}/>My Cart</Link>
				<Link to="/edit-profile" style={linkStyle}><Person style={Constants.iconStyle}/>Edit Profile</Link>

				<SearchBox history={props.history}/>
			</Navbar>
		</div>
	);
}

const mapStateToProps = ( state ) => {
	return {
		user: state.user
	}
};

export default connect( mapStateToProps, null )( NavBar );