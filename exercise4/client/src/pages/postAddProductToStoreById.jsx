import React, { useContext, useState } from 'react'
import Store from '../components/Store';
import { StoreContext } from '../context/storesContext';


export default function PostAddProductToStoreById() {
    const { AddProduct } = useContext(StoreContext);
    const [newProduct, setNewProduct] = useState("");
    const [storeId, setStoreId] = useState("");

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productSalePrice, setProductSalePrice] = useState("");

    return (
        <div style={{ textAlign: "center" }}>
            <div>
                <p>store id:</p>

                <input type="number" onChange={(e) => {
                    setStoreId(e.target.value);
                }} />
            </div>
            <div>
                <p>product id:</p>

                <input type="number" onChange={(e) => {
                    setProductId(e.target.value);
                }} />
            </div>

            <div>
                <p>name:</p>
                <input type="text" onChange={(e) => {
                    setProductName(e.target.value);
                }} />
            </div>

            <div>
                <p>price:</p>

                <input type="text" onChange={(e) => {
                    setProductPrice(e.target.value);
                }} />
            </div>
            <div>
                <p>sale price:</p>

                <input type="text" onChange={(e) => {
                    setProductSalePrice(e.target.value);
                }} />
            </div>
            <br />
            <button style={{ textAlign: "center" }} onClick={async (e) => {
                if (storeId === "" || productId === "" || productName === "" || productPrice === "" || productSalePrice === "") {
                    return;
                }
                let prodToAdd = await AddProduct(storeId, productId, productName, productPrice, productSalePrice);
                setNewProduct(prodToAdd)

            }}>Add</button>
            {newProduct !== null && newProduct !== "" && !newProduct.hasOwnProperty('message') ? <Store
                id={newProduct.id}
                name={newProduct.name}
                city={newProduct.city}
                items={newProduct.items}
                key={newProduct.id}
            /> : <p>
                {newProduct.message}
            </p>}
        </div>
    );
}
//if newProduct have property of message [error] display the p element with the error message as content
//if doesnt show the info of the new product.