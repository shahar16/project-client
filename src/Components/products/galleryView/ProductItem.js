import React, { useEffect, useState } from 'react'
import { Badge, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import StoreService from '../../../Services/store.service'
import constants from '../../../Shared/Util/Constants'
import DeleteProduct from '../deleteProduct'

function ProductItem ({ item, renderStore, token, user, editMode, afterDelete }) {
  const [showDelete, setShowDelete] = useState(false)

  const styleWithoutDelete = { width: '15rem', height: '20rem' }
  const styleWithDelete = { width: '15rem', height: '24rem' }

  useEffect(() => {
    const findOwner = async () => {
      const owner = await StoreService.getOwner(item.storeID)
      setShowDelete(
        token &&
        user.email === owner.owner &&
        renderStore &&
        editMode)
    }
    findOwner()
  })

  return (
    <Card style={showDelete ? styleWithDelete : styleWithoutDelete}>
      <Link to={`/products/${item.storeID}/${item.sn}`}>
        <div style={{ height: '16rem' }}>
          <Card.Img class="mh-100 mw-100" variant="top" src={`${constants.serverUrl}/${item.image[0]}`}/>
        </div>
        <Card.Body>
          <div className={'d-flex mb-0 justify-content-between'}>
            <Card.Title as={'h5'} className={'mb-0'}>{item.name}</Card.Title>
            <Badge pill className={'mb-1'} variant={'warning'}>{item.price} ₪</Badge>
          </div>
        </Card.Body>
      </Link>
      {showDelete && <Card.Footer>
        <div className={'d-flex mb-0 mt-0 justify-content-between'}>
          <DeleteProduct product={item} afterDelete={afterDelete}/>
        </div>
      </Card.Footer>}
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user:  state.user
  }
}

export default connect(mapStateToProps, null)(ProductItem)
