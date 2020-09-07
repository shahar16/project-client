import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useId } from 'react-id-generator'
import ProductsGroup from '../Components/products/galleryView/ProductsGroup'
import ProductService from '../Services/product.service'

function SearchResults (props) {
  const numOfCardInRaw = 5
  const [productsList, setProductsList] = useState(null)
  const [componentId] = useId()

  useEffect(() => {
    fetchData()
  }, [props.match.params.query])

  const fetchData = async () => {
    try {
      const res = await ProductService.search(props.match.params.query)
      setProductsList(getGroupList(res))
      console.log(res)
    } catch (err) {
      const error = await err.response.data.message
      console.log(error)
    }
  }

  const getGroupList = (list) => {
    let returnValue = []
    let group = []
    for (let i = 0; i < list.length; i++) {
      group.push(list[i])
      if (( i === list.length - 1 ) || ( i % numOfCardInRaw === numOfCardInRaw - 1 )) {
        returnValue.push(group)
        group = []
      }
    }

    return returnValue
  }

  return (
    <div>
      {props.match.params.query && <Helmet>
        <title>Search for: {props.match.params.query}</title>
      </Helmet>}
      <h4>Your search results for '{props.match.params.query}':</h4>
      <br/>
      {productsList && productsList.map((items, index) => <ProductsGroup items={items}
                                                                         key={`${componentId}:${index}`}/>)}
    </div>
  )
}

export default SearchResults