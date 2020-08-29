import React, { useEffect, useState } from 'react';
import { Col, Row } from "react-bootstrap";
import ProductsGalleryView from "../Components/products/galleryView/ProductsGalleryView";
import StoreService from "../Services/store.service";
import ModalForNewProduct from '../Components/modals/ModalForNewProduct';
import { connect } from "react-redux";
import Error from "../Components/Error";


function StorePage(props) {
    const [show, setShow] = useState(false);
    const [item, setItem] = useState(null);

    useEffect(() => {
        console.log("rendering StorePage")
        setShow(true);
        getStore();
    }, [props.match.params]);

    const getStoreProducts = async () => {
        return await StoreService.getStoreProducts(props.match.params);
    }

    const getStore = async () => {
        const storeItem = await StoreService.getStore(props.match.params);
        setItem(storeItem);
    }

    function enableEditingStore() {
        const storeOwnerID = item.owner;
        return storeOwnerID === props.user.email;
    }

    function printStoreDetails() {
        return (
            <Col>
                <h3>Description</h3>
                <p>{item.desc}</p>
                <br />
                <hr />
                <h3>Contact</h3>
                <p>Email: {item.contact.email}</p>
                <p>Phone: {item.contact.phoneNumber}</p>
                <p>Address: {item.contact.city}</p>
                <p>         {item.contact.street}</p>
                <p>         {item.contact.houseNum}</p>
            </Col>
        )
    }

    function renderNewProductModal() {
        return (
            <Row>
                <Col md={10}></Col>
                <Col md={2}><ModalForNewProduct storeID={item.storeID} /> <br /></Col>
                <Col md={1}></Col>
            </Row>
        )
    }

    return (
        <div className="under-nav-bar">
            {item && <div class="jumbotron text-center">
                <h1>Welcome to {item.name}</h1>
                <p>Resize this responsive page to see the effect!</p>
            </div>}
            {item && props.token && enableEditingStore() && renderNewProductModal()}
            <br />
            <Row>
                <Col md={9}>
                    {(item && < ProductsGalleryView fetchService={getStoreProducts} renderStore={true} />) || <Error />}
                </Col>
                {item && printStoreDetails()}
            </Row>
        </div >
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user
    }
}

export default connect(mapStateToProps, null)(StorePage);
