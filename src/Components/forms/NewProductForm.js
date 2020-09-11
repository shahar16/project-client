import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FileEarmarkMinus } from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import ProductService from '../../Services/product.service'
import Constants from '../../Shared/Util/Constants'
import * as actions from '../../Store/actions'
import ImagesFieldArray from './fieldArray/ImagesFieldArray'
import QuantitiesFielArray from './fieldArray/QuantitiesFielArray'
import Labels from './Labels'

const NewProductSchema = Yup.object().shape({
  name:       Yup.string().required('Product name is required'),
  price:      Yup.number().required('Price is required'),
  desc:       Yup.string().required('Description is required'),
  type:       Yup.string().required('Type is required'),
  images:     Yup.array().of(Yup.object().shape({
    image: Yup.mixed().required('image is required')
  })).min(1).required('Please insert at least one image.'),
  quantities: Yup.array().of(Yup.object().shape({
    name:     Yup.string().required('Name is required'),
    quantity: Yup.number().min(1).required('Quantity is required')
  })).min(1)
})

const EditProductSchema = Yup.object().shape({
  name:       Yup.string().required('Product name is required'),
  price:      Yup.number().required('Price is required'),
  desc:       Yup.string().required('Description is required'),
  type:       Yup.string().required('Type is required'),
  images:     Yup.array().of(Yup.object().shape({
    image: Yup.mixed()
  })),
  quantities: Yup.array().of(Yup.object().shape({
    name:     Yup.string().required('Name is required'),
    quantity: Yup.number().min(1).required('Quantity is required')
  })).min(1)
})

function NewProductForm (props) {
  const [errorMessage, setErrorMessage] = useState(null)
  const [showImagesArray, setShowImagesArray] = useState(true)

  useEffect(() => {
    if (props && props.productToEdit) {
      setShowImagesArray(false)
    }
  }, [])

  const buildStock = (values) => {
    let stock = { 'type': values.type }
    let quantities = {}
    values.quantities.forEach((field) => quantities[field.name] = field.quantity)
    stock['quantities'] = quantities

    return JSON.stringify(stock)
  }

  const handleSubmit = async (values) => {

    let formData = new FormData()
    const stock = buildStock(values)
    values.images.forEach((currentImage) => formData.append('image', currentImage.image))
    formData.append('name', values.name)
    formData.append('label', values.label)
    formData.append('price', values.price)
    formData.append('desc', values.desc)
    formData.append('stock', stock)
    formData.append('sn', values.sn)
    formData.append('storeID', props.storeID)
    formData.append('owner', props.user.email)

    props.startAction()
    try {
      if (props.productToEdit) {
        await ProductService.editProduct(formData, props.token)
      } else {
        await ProductService.addProduct(formData, props.token)
      }
      props.productAdded()
    } catch (err) {
      if (props.productToEdit) {

      } else {
        const error = err.response.data.message.split().toString().split(':')[3]
        setErrorMessage(error)
      }
    } finally {
      props.finishAction()
    }
  }

  return (
    <Formik
      initialValues={props.productToEdit || {
        name:       '',
        price:      '',
        desc:       '',
        type:       '',
        sn:         '',
        quantities: [{
          name:     '',
          quantity: ''
        }],
        images:     [{
          image: null
        }],
        label: []
      }}
      validationSchema={showImagesArray ? NewProductSchema : EditProductSchema}
      onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => {
        return (
          <Form>
            <label>General Information</label>
            <div className="form-group row">
              <label htmlFor="newProduct-sn" className="col-sm-3 col-form-label">Serial Number</label>
              <div className="col-sm-9">
                <Field type="text" name="sn" className="form-control"
                       disabled={props.productToEdit} id="newProduct-sn"/>
                <ErrorMessage name="sn" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="newProduct-name" className="col-sm-3 col-form-label">Product Name</label>
              <div className="col-sm-9">
                <Field type="text" name="name" className="form-control"
                       id="newProduct-name"/>
                <ErrorMessage name="name" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="newProduct-price" className="col-sm-3 col-form-label">Price</label>
              <div className="col-sm-9">
                <Field type="text" name="price" className="form-control" id="newProduct-price"/>
                <ErrorMessage name="price" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="newProduct-desc" className="col-sm-3 col-form-label">Description</label>
              <div className="col-sm-9">
                <Field type="text" name="desc" className="form-control"
                       id="newProduct-desc"/>
                <ErrorMessage name="desc" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <label>Quantities</label>
            <div className="form-group row">
              <label htmlFor="newProduct-type" className="col-sm-3 col-form-label">Option Type</label>
              <div className="col-sm-9">
                <Field type="text" name="type" className="form-control"
                       id="newProduct-type"/>
                <ErrorMessage name="type" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <QuantitiesFielArray values={values}/>
            <br/>
            {showImagesArray && <div className="form-group">
              <label>Images</label>
            </div>}
            {!showImagesArray && <div className="form-group">
              <label>To edit images you need to remove them all and upload again</label>
            </div>}
            {showImagesArray && <ImagesFieldArray values={values} setFieldValue={setFieldValue}/>}
            {!showImagesArray && <div>
              <Button variant="warning" block onClick={() => setShowImagesArray(true)}>
                <FileEarmarkMinus style={Constants.iconStyle}/>
                Remove Images
              </Button>
            </div>}
            <br/>
            <label>Labels</label>
            <div className="form-group row">
              <div className="col-sm-2"></div>
              <div className="col-sm-10">
                <Labels setFieldValue={setFieldValue} productToEdit={props.productToEdit}/>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm)