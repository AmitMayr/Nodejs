import React, { useContext, useState } from 'react'
import Product from '../components/Product';
import { StoreContext } from '../context/storesContext';


export default function GetProductByNames() {
    const { LoadProductByStoreNameAndProdName } = useContext(StoreContext);
    const [product, setProduct] = useState("")
    const [storeName, setStoreName] = useState("")
    const [prodName, setProdName] = useState("")
    // if (product === null || product === "" ||product.id === -1 || product.id===-2) {
    return (
        <div >
            <div>
                <p>store name:</p>
                <input type="text" value={storeName} onChange={(e) => {
                    setStoreName(e.target.value);
                }} />


            </div>
            <div>
                <p>prod name:</p>
                <input type="text" value={prodName} onChange={(e) => {
                    setProdName(e.target.value);
                }} />

            </div>
            <button onClick={async (e) => {
                if (storeName === "" || prodName == "") {
                    return;
                }
                const product = await LoadProductByStoreNameAndProdName(storeName, prodName);
                //using the context func and wait for the result from our server
                setProduct(product)
                //set the product to display 

            }}>Search</button>

            {product.id === -1 && <div>
                No store found
            </div>}
            {product.id === -2 && <div>
                No product with name found in the store
            </div>}

            {product !== null && product !== "" && product.id !== -2 && product.id !== -1 && <Product
                id={product.id}
                name={product.name}
                price={product.price}
                salePrice={product.salePrice}
                key={product.id}
            />}
        </div>
    );

}