/* eslint-disable no-use-before-define */
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import React, { useEffect, useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import ProductService from "../Services/product.service";

export default function SearchBox() {
	const [ productsList, setProductsList ] = useState( null );
	const [ selection, setSelection ] = useState( "" );
	const [ error, setError ] = useState( null );

	useEffect( () => {
		const fetchList = async () => {
			const list = await ProductService.getProductsNamesList();
			setProductsList( list );
		}

		fetchList();
	}, [] )

	const handleSearch = async () => {
		if ( !selection ) {
			setError( "Please enter a search query." );
			return;
		}
		setError( null );

		try {
			const res = await ProductService.search( selection );
			console.log( res )
		} catch ( err ) {
			const error = await err.response.data.message;
			setError( error );
		}
	};

	return (
		<div>
			<Form inline>
				<Autocomplete
					id="highlights-demo"
					className="mr-sm-2"
					freeSolo
					selectOnFocus
					style={{ width: 200 }}
					options={productsList}
					onChange={( event, value, reason ) => {
						if ( reason === "select-option" ) {
							setSelection( value.title );
						} else if ( reason === "clear" ) {
							setSelection( "" );
						}
					}}
					onInputChange={( event, value, reason ) => {
						if ( reason === "input" ) {
							setSelection( value );
						} else if ( reason === "clear" ) {
							setSelection( "" );
						}
					}}
					getOptionLabel={( option ) => option.title}
					renderInput={( params ) => (
						<TextField {...params} label="Search" variant="outlined" margin="normal" size="small"/>
					)}
					renderOption={( option, { inputValue } ) => {
						const matches = match( option.title, inputValue );
						const parts = parse( option.title, matches );

						return (
							<div>
								{parts.map( ( part, index ) => (
									<span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
										{part.text}
									  </span>
								) )}
							</div>
						);
					}}
				/>
				<Button variant="outline-primary" onClick={handleSearch} className="mt-2">
					<Search/>
				</Button>
			</Form>
			{error &&
			<div className="form-validation-alert">
				{error}
			</div>}
		</div>
	);
}