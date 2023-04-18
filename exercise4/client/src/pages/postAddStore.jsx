import React, { useContext, useState } from 'react'
import Store from '../components/Store';
import { StoreContext } from '../context/storesContext';


export default function PostAddStore() {
    const { AddStore } = useContext(StoreContext);
    const [newStore, setNewStore] = useState("");
    const [storeId, setStoreId] = useState("");
    const [storeName, setStoreName] = useState("");
    const [storeCity, setStoreCity] = useState("");

    if (newStore === null || newStore === "") {
        return (
            <div style={{textAlign:"center"}}>
                <div>
                    <p>id:</p>

                    <input type="number" onChange={(e) => {
                        setStoreId(e.target.value);
                    }} />
                </div>

                <div>
                    <p>name:</p>
                    <input type="text" onChange={(e) => {
                        setStoreName(e.target.value);
                    }} />
                </div>

                <div>
                    <p>city:</p>

                    <input type="text" onChange={(e) => {
                        setStoreCity(e.target.value);
                    }} />
                </div>
                <br />
                <button onClick={async (e) => {
                    if (storeId === null) {
                        return;
                    }
                    let storeToAdd = await AddStore(storeId, storeName, storeCity);
                    setNewStore(storeToAdd)

                }}>Add</button>
                <p>

                </p>
            </div>
        );

    }



    return (
        <div style={{ width: "100%" }}>
            <div>
                <div>
                    <p>id:</p>

                    <input type="number" onChange={(e) => {
                        setStoreId(e.target.value);
                    }} />
                </div>

                <div>
                    <p>name:</p>
                    <input type="text" onChange={(e) => {
                        setStoreName(e.target.value);
                    }} />
                </div>

                <div>
                    <p>city:</p>

                    <input type="text" onChange={(e) => {
                        setStoreCity(e.target.value);
                    }} />
                </div>
                <button onClick={async (e) => {
                    if (storeId === null) {
                        return;
                    }
                    const storeToAdd = await AddStore(storeId, storeName, storeCity);

                    setNewStore(storeToAdd)

                }}>Add</button>
            </div>
            {/* {newStore.message} */}


            {!newStore.hasOwnProperty('message') ? <Store
                id={newStore.id}
                name={newStore.name}
                city={newStore.city}
                items={newStore.items}
                key={newStore.id}
            /> : <p>
                {newStore.message}
            </p>}
        </div>
    )
}
//if newStore have property of message [error] display the p element with the error message as content
//if doesnt show the info of the new store.