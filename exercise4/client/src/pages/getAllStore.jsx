import React, { useContext } from 'react'
import { StoreContext } from '../context/storesContext';
import Store from '../components/Store';


export default function GetAllStore(props) {
  const { stores } = useContext(StoreContext); //gets all stores from the context
  let storesInDB = stores.map((store) => //for each store creating a new store component with the props.
  (<Store
    id={store.id}
    name={store.name}
    city={store.city}
    items={store.items}
    key={store.id}
  />)
  );
  return (
    <div style={{ width:"95%", display: "grid", margin: "auto", gap: 10 }}>{storesInDB}</div>
  )
}