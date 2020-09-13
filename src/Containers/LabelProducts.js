import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useId } from 'react-id-generator'
import ProductsGroup from '../Components/products/galleryView/ProductsGroup'
import ProductService from '../Services/product.service'

function LabelProducts (props) {
  const numOfCardInRaw = 5
  const [productsList, setProductsList] = useState(null)
  const [componentId] = useId()

  useEffect(() => {
    fetchData()
  }, [props.match.params.label])

  const fetchData = async () => {
    try {
      const res = await ProductService.getLabelProducts(props.match.params.label)
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
      {props.match.params.label && <Helmet>
        <title>Products for label: {props.match.params.label}</title>
      </Helmet>}
      <h4>Products for label '{props.match.params.label}':</h4>
      <br/>
      {productsList && productsList.map((items, index) => <ProductsGroup items={items}
                                                                         key={`${componentId}:${index}`}/>)}
    </div>
  )
}

export default LabelProducts