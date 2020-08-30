import React, { useEffect, useState } from 'react';
import Autocomplete from "react-autocomplete"
import ProductService from "../Services/product.service"

function Search( props ) {
	const [ value, setValue ] = useState( "" );
	const [ productsList, setProductsList ] = useState( null );

	useEffect( () => {
		const fetchList = async () => {
			const list = await ProductService.getProductsNamesList();
			console.log(list);
			setProductsList( list );
		}

		fetchList();
	} , [])

	return (
		<div>
			{productsList && <Autocomplete
				getItemValue={( item ) => item.label}
				items={productsList}
				renderItem={( item, isHighlighted ) =>
					<div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
						{item.label}
					</div>
				}
				value={value}
				onChange={( e ) => setValue( e.target.value )}
				onSelect={( val ) => setValue( val )}
			/>}
		</div>
	);
}

export default Search;