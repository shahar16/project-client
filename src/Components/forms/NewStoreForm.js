import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FileEarmarkMinus } from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import StoreService from '../../Services/store.service'
import Constants from '../../Shared/Util/Constants'
import * as actions from '../../Store/actions'
import ImagesFieldArray from './fieldArray/ImagesFieldArray'

const NewStoreSchema = Yup.object().shape({
  name:        Yup.string().required('Product name is required'),
  desc:        Yup.string().required('Description is required'),
  images:      Yup.array().of(Yup.object().shape({
    image: Yup.mixed().required('image is required')
  })).min(1).required('You must enter at least one image'),
  email:       Yup.string().required('Contact email is required ').email('Invalid email'),
  phoneNumber: Yup.string().required('Phone number is required'),
  city:        Yup.string(),
  street:      Yup.string(),
  houseNum:    Yup.number(),
})

const EditStoreSchema = Yup.object().shape({
  name:        Yup.string().required('Product name is required'),
  desc:        Yup.string().required('Description is required'),
  images:      Yup.array().of(Yup.object().shape({
    image: Yup.mixed()
  })),
  email:       Yup.string().required('Contact email is required ').email('Invalid email'),
  phoneNumber: Yup.string().required('Phone number is required'),
  city:        Yup.string(),
  street:      Yup.string(),
  houseNum:    Yup.number(),
})

function NewStoreForm (props) {
  const [errorMessage, setErrorMessage] = useState(null)
  const [showImagesArray, setShowImagesArray] = useState(true)

  useEffect(() => {
    if (props && props.storeToEdit) {
      setShowImagesArray(false)
    }
  }, [])

  const buildContact = (values) => {
    let contact = {}
    contact.email = values.email
    contact.phoneNumber = values.phoneNumber
    contact.adress = {}
    contact.adress.city = values.city
    contact.adress.street = values.street
    contact.adress.houseNum = values.houseNum

    return JSON.stringify(contact)
  }

  const handleSubmit = async (values) => {
    let formData = new FormData()
    const contact = buildContact(values)
    if (showImagesArray) {
      values.images.forEach((currentImage) => formData.append('image', currentImage.image))
    }
    formData.append('name', values.name)
    formData.append('desc', values.desc)
    formData.append('contact', contact)
    formData.append('owner', props.user.email)
    if (props.storeToEdit) {
      formData.append('storeID', props.storeToEdit.storeID)
    }

    props.startAction()
    try {
      if (props.storeToEdit) {
        await StoreService.editStore(formData, props.token)
      } else {
        await StoreService.addStore(formData, props.token)
      }
      props.storeAdded()
    } catch (err) {
      if (props.storeToEdit) {
        const error = await err.response.data.message
        setErrorMessage(error)
      } else {
        const errors = await err.response.data.message.split(':')
        const error = errors[errors.length - 1]
        setErrorMessage(error)
      }
    } finally {
      props.finishAction()
    }
  }

  return (
    <Formik
      initialValues={props.storeToEdit || {
        name:        '',
        desc:        '',
        images:      [{
          image: null
        }],
        email:       '',
        phoneNumber: '',
        city:        '',
        street:      '',
        houseNum:    '',
      }}
      validationSchema={showImagesArray ? NewStoreSchema : EditStoreSchema}
      onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => {
        return (
          <Form>
            <label>General Information</label>
            <div className="form-group row">
              <label htmlFor="newStore-name" className="col-sm-3 col-form-label">Store Name</label>
              <div className="col-sm-9">
                <Field type="text" name="name" className="form-control"
                       disabled={props.storeToEdit} id="newStore-name"/>
                <ErrorMessage name="name" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="newStore-desc" className="col-sm-3 col-form-label">Description</label>
              <div className="col-sm-9">
                <Field type="text" name="desc" className="form-control" id="newStore-desc"/>
                <ErrorMessage name="desc" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group">
              <label>Contact</label>
            </div>
            <div className="form-group row">
              <label htmlFor="newStore-email" className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-9">
                <Field type="email" name="email" className="form-control" id="newStore-email"/>
                <ErrorMessage name="email" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="newStore-phoneNumber" className="col-sm-3 col-form-label">Phone Number</label>
              <div className="col-sm-9">
                <Field type="text" name="phoneNumber" className="form-control"
                       id="newStore-phoneNumber"/>
                <ErrorMessage name="phoneNumber" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="newStore-city" className="col-sm-3 col-form-label">City</label>
              <div className="col-sm-9">
                <Field type="text" name="city" className="form-control" id="newStore-city"/>
                <ErrorMessage name="city" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="edit-profile-street" className="col-sm-3 col-form-label">Street</label>
              <div className="col-sm-5">
                <Field type="text" name="street" className="form-control"
                       id="edit-profile-street"/>
                <ErrorMessage name="street" component="div" className="form-validation-alert"/>
              </div>
              <label htmlFor="edit-profile-num" className="col-sm-1 col-form-label">Num</label>
              <div className="col-sm-3">
                <Field min="1" type="number" name="houseNum" className="form-control" id="edit-profile-num"/>
                <ErrorMessage name="houseNum" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group">
              <label>Images</label>
            </div>
            {showImagesArray && <ImagesFieldArray values={values} setFieldValue={setFieldValue}/>}
            {!showImagesArray && <div>
              <Button variant="warning" block onClick={() => setShowImagesArray(true)}>
                <FileEarmarkMinus style={Constants.iconStyle}/>
                Remove Images
              </Button>
            </div>}
            <br/>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </div>
            {errorMessage &&
            <div className="alert alert-danger">{errorMessage}</div>
            }
          </Form>
        )
      }
      }
    </Formik>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user:  state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startAction:  () => dispatch(actions.startAction()),
    finishAction: () => dispatch(actions.finishAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStoreForm)