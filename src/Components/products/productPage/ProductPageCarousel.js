import React from 'react';
import { Carousel } from "react-bootstrap";
import Constants from "../../../Shared/Util/Constants";

const ProductPageCarousel = ( {item} ) => {
	return (
		<div>
			<Carousel>
				{
					item.image.map( (imag) => <Carousel.Item>
						<img
							className="d-block w-100"
							src={`${Constants.serverUrl}/${imag}`}
							alt={item.name}
							style={Constants.productPageStyle}
						/>
					</Carousel.Item>)
				}
			</Carousel>
		</div>
	);
};

export default ProductPageCarousel;