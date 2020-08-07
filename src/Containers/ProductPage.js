import React from 'react';
import { Badge, Button, Col, Jumbotron, Row } from "react-bootstrap";
import ProductPageCarousel from "../Components/products/productPage/ProductPageCarousel";

function ProductPage( { item } ) {
	return (
		<div>
			<br/>
			<Row>
				<Col md={1}></Col>
				<Col md={6}>
					<ProductPageCarousel item={item}/>
				</Col>
				<Col>
					<Jumbotron>
						<br/>
						<Row>
							<Col>
								<h2>{item.name}</h2>
								<p>
									{item.desc}
								</p>
							</Col>
							<Col>
								<h1>
									<Badge pill className={"mb-8"} variant={"warning"}>{item.price} ₪</Badge>
								</h1>
							</Col>
						</Row>
						<hr/>
						<Row>
							<Col>
								<h3>options</h3>
								<p>
									<ul>
										<li>option 1</li>
										<li>option 2</li>
										<li>option 3</li>
										<li>option 4</li>
										<li>option 5</li>
									</ul>
								</p>
							</Col>
							<Col></Col>
						</Row>
						<hr/><br/>
						<Row>
							<Col>
								<Button variant="primary" block>Add to cart</Button>
							</Col>
							<Col>
								<Button variant="success" block>Buy it now</Button>
							</Col>
						</Row>
					</Jumbotron>
				</Col>
				<Col md={1}></Col>
			</Row>
		</div>
	);
}

export default ProductPage;