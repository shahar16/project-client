import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { CheckCircleFill, Pencil } from 'react-bootstrap-icons'
import Constants from '../../Shared/Util/Constants'
import NewStoreForm from '../forms/NewStoreForm'

function ModalForEditStore ({ storeToEdit, handleUpdate }) {
  const [show, setShow] = useState(false)
  const [storeEdited, setStoreEdited] = useState(false)

  const handleClose = () => {
    setShow(false)
  }

  const handleShow = () => {
    setShow(true)
  }

  const handleStoreEdited = () => {
    setStoreEdited(true)
    setTimeout(handleClose, 1000)
    setTimeout(afterEdit, 1100)
    handleUpdate()
  }

  const afterEdit = () => {
    setStoreEdited(false)
  }

  const prepareStoreToEdit = (store) => {
    return {
      storeID:     store.storeID,
      name:        store.name,
      desc:        store.desc,
      email:       store.contact.email,
      phoneNumber: store.contact.phoneNumber,
      city:        store.contact.adress.city,
      street:      store.contact.adress.street,
      houseNum:    store.contact.adress.houseNum,
      images:      [{
        image: null
      }]
    }
  }

  return (
    <div>
      <Button variant="success" onClick={handleShow} className="modal-for-new-object">
        <Pencil style={Constants.iconStyle}/>
        Edit Store Info
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Store Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!storeEdited &&
          <NewStoreForm storeAdded={handleStoreEdited} storeToEdit={prepareStoreToEdit(storeToEdit)}/>}
          {storeEdited &&
          <div><CheckCircleFill style={{ 'marginRight': '10px' }}/>Store edited successfully</div>}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalForEditStore