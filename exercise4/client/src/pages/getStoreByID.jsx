import React, { useContext, useState } from 'react'
import Store from '../components/Store';
import { StoreContext } from '../context/storesContext';


export default function GetStoreById(props) {
    const { LoadStoreByID } = useContext(StoreContext);
    const [store, setstore] = useState("")
    const [storeId, setStoreId] = useState(null)

    return (
        <div style={{ width: "100%" }}>
            <p>Enter store id :</p>
            <input type="number" onChange={(e) => {
                setStoreId(e.target.value);
            }} />
            <br />
            <br />
            <button onClick={async (e) => {
                if (storeId === null) {
                    return;
                }
                const storeById = await LoadStoreByID(storeId);
                setstore(storeById)
            }}>Search</button>

            {store === null && <div>
                No store found
            </div>}

            {store !== null && store !== "" && <Store
                id={store.id}
                name={store.name}
                city={store.city}
                items={store.items}
                key={store.id}
            />}
        </div>
    );

}