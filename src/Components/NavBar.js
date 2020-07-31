import React from 'react';
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";

function NavBar( props ) {

	const getUserMessage = () => {
		if ( props.user ) {
			return `Hi ${props.user.firstName} ${props.user.lastName}`;
		} else {
			return <div>
				Hi, please <a href="/login">Log in</a> or <a href="/signup">Sign Up</a>
			</div>
		}
	}

	return (
		<Navbar bg="light" variant="light" fixed="top">
			<Navbar.Brand href="#home"><h1>Retail-it!</h1></Navbar.Brand>
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
	);
}

const mapStateToProps = ( state ) => {
	return {
		user: state.user
	}
};

export default connect( mapStateToProps, null )( NavBar );