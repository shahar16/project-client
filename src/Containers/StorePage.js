import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import ProductsGalleryView from "../Components/products/galleryView/ProductsGalleryView";
import StoreService from "../Services/store.service"
import Constants from "../Shared/Util/Constants";
import * as actions from "../Store/actions";

function StorePage(props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true)
    }, [props]);

    const getStore = async (storeID) => {
        return await StoreService.getStore(storeID);
    }

    return (
        <div className="under-nav-bar">
            {/* <h1>Welcome to {props.storeItem.name}</h1> */}
            <div class="jumbotron text-center">
                <h1>Welcome to {props.storeItem.name}</h1>
                <p>Resize this responsive page to see the effect!</p>
            </div>
            <Row>
                <Col md={9} >
                    < ProductsGalleryView fetchService={getStore} storeItem={props.storeItem} renderStore={true} />
                </Col>
                <Col >
                    <h3>Description</h3>
                    <p>{props.storeItem.desc}</p>
                    <br />
                    <hr />
                    <h3>Contact</h3>
                    <p>Email: {props.storeItem.contact.email}</p>
                    <p>Phone: {props.storeItem.contact.phoneNumber}</p>
                    <p>Address: {props.storeItem.contact.city}</p>
                    <p>         {props.storeItem.contact.street}</p>
                    <p>         {props.storeItem.contact.houseNum}</p>
                </Col>
            </Row>
        </div >
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuth: () => dispatch(actions.checkState())
    }
};

export default connect(null, mapDispatchToProps)(StorePage);