import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import img from "../resources/images/nav-bar-image.jpeg";
import logo from "../resources/images/store-line-logo.png"

function NavBar( props ) {
	let listener = null
	const [ scrollState, setScrollState ] = useState( "top" )

	useEffect( () => {
		listener = document.addEventListener( "scroll", e => {
			let scrolled = document.scrollingElement.scrollTop
			if ( scrolled >= 780 ) {
				setScrollState( "full-opacity" )
			} else if ( scrolled >= 600 ) {
				setScrollState( "high-opacity" )
			} else if ( scrolled >= 400 ) {
				setScrollState( "mid-opacity" )
			} else if ( scrolled >= 200 ) {
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
			// "backgroundImage": `url(${img2})`,
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
				<Nav.Link href="/">Home</Nav.Link>
				<Nav.Link href="#features">Features</Nav.Link>
				<Nav.Link href="#pricing">Pricing</Nav.Link>
				<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
					<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
					<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
					<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
					<NavDropdown.Divider/>
					<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
				</NavDropdown>

				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2"/>
					<Button variant="outline-primary">Search</Button>
				</Form>
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