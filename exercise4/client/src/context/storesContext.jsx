import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext();

//context that using the server to get information.
export default function StoreContextProvider({ children }) {

  const [stores, SetStores] = useState([]);

  const LoadStores = async () => {
    try {
      let res = await fetch('http://localhost:5000/api/store');
      let data = await res.json();
      // console.table(data);
      SetStores(data);
    } catch (error) {
      console.error(error);
    }
  }

  const LoadStoreByID = async (storeId) => {
    try {
      let res = await fetch(`http://localhost:5000/api/store/${storeId}`);
      let data = await res.json();
      return data;
    } catch (error) {
      return null;
    }
  }

  const LoadProductByStoreNameAndProdName = async (storeName, prodName) => {
    try {
      let res = await fetch(`http://localhost:5000/api/store/${storeName}/${prodName}`);
      let data = await res.json();
      return data;
    } catch (error) {
      return null;
    }
  }
  const AddStore = async (storeId, storeName, storeCity) => {
    try {
      const res = await fetch(`http://localhost:5000/api/store/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: storeId, name: storeName, city: storeCity })
      });
      let data = await res.json();
      return data;
    } catch (error) {
      return null;
    }
  }

  const AddProduct = async (storeId, itemId, itemName, itemPrice, itemSalePrice) => {
    try {
      const res = await fetch(`http://localhost:5000/api/store/${storeId}/items/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: itemId, itemName: itemName, itemPrice: itemPrice, itemSalePrice: itemSalePrice })
      });
      let data = await res.json();
      return data;
    } catch (error) {
      return null;
    }
  }


  useEffect(() => {
    LoadStores();
  }, []);

  const value = {
    stores
    , LoadStoreByID, LoadProductByStoreNameAndProdName
    , AddStore, AddProduct
  }

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}