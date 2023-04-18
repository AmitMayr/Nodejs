//page of the routes 
const userRouter = require('express').Router();
const storesPath = "../db/stores.json";
let dbStores = require(storesPath); //gets the db json file
var fs = require('fs');    //to write to the db json file.


// http://localhost:5000/api/store
userRouter.get(`/`, async (req, res) => { // shows all the stores and items.
    if (dbStores) {
        res.status(200).json(dbStores);
    }
    else {
        res.status(404).json({ message: "error getting the json file or the file is empty" });
    }

});
//http://localhost:5000/api/store/:id
userRouter.get(`/:id`, async (req, res) => {//shoes the store that match the given id
    let { id } = req.params;
    id = parseInt(id);
    let shop = dbStores.find((shop) => shop.id === id);
    if (shop) {
        console.log(shop);
        res.status(200).json(shop);
    }
    else {
        res.status(404).json(null);
    }

});
//http://localhost:5000/api/store/:store/:item
userRouter.get(`/:store/:item`, async (req, res) => {//shows spec item from a spec store
    let { store, item } = req.params;
    let shop = dbStores.find((shop) => shop.name === store);//looking for shop with name of the parameter store
    if (!shop) {//if no store matched
        res.status(404).json({ id: -1 });
        return;
    }
    let product = shop.items.find((elem) => elem.name === item);//looking for item with name of the parameter item
    if (!product) {//if no item matched
        res.status(404).json({ id: -2 });
        return;
    }
    res.status(200).json(product);//if found the item display it
});

//http://localhost:5000/api/store/add 
//getting values by body.
userRouter.post('/add', async (req, res) => {
    try {
        let { id, name, city } = req.body;
        id = Number(id);
        if (!id || !name || !city) {
            return res.status(404).json({ message: "Failed getting the info from body." });
        }

        let isAlreadyExists = dbStores.find(store => store.id === id);
        if (isAlreadyExists) {
            return res.status(404).json({ message: "store id already exists." });
        }

        let newStore = {
            id: id,
            name: name,
            city: city,
            items: []
        };

        dbStores.push(newStore);
        let isSuccessWritten = false;
        async function writeFileAndCheckStatus(filename, data) {
            try {
                await fs.promises.writeFile(filename, data);
                isSuccessWritten = true;
            } catch (err) {
                isSuccessWritten = false;
            }
        }
        await writeFileAndCheckStatus('../express/db/stores.json', JSON.stringify(dbStores));
        if (!isSuccessWritten) {
            return res.status(404).json({ message: "Failed to write to file." });
        }

        return res.status(201).json(newStore);

    } catch (error) {
        console.error(error); // Log the error
        return res.status(404).json({ message: "Error" + error.message });
    }
});

//http://localhost:5000/api/store/:store/item/add
//gets the id of the store by query
//gets the new item props from body. [itemId, itemName, itemPrice, itemSalePrice } = req.body]
userRouter.post(`/:store/items/add`, async (req, res) => {//add item to a store
    let { store } = req.params; // gets the store id from the query
    let { itemId, itemName, itemPrice, itemSalePrice } = req.body; //gets the new item json params from the body [Thunder client]
    store = parseInt(store);//cast the id from query to int to compare
    let storeToUpdate = dbStores.find((shop) => shop.id === store)
    if (!storeToUpdate) {
        res.status(404).json({ message: "the id of store do not exists" });
        return;
    }

    let isItemExists = storeToUpdate.items.find((storeToUpdate) => storeToUpdate.id === itemId || storeToUpdate.name === itemName)
    if (isItemExists) {
        res.status(404).json({ message: "the item id or name already exists" });
        return;
    }
    let newItem = {
        id: itemId, name: itemName, price: itemPrice, salePrice: itemSalePrice,
    }
    storeToUpdate.items.push(newItem)
    let isSuccessWritten = false;
    async function writeFileAndCheckStatus(filename, data) {
        try {
            await fs.promises.writeFile(filename, data);
            isSuccessWritten = true;
        } catch (err) {
            isSuccessWritten = false;
        }
    }
    await writeFileAndCheckStatus('../express/db/stores.json', JSON.stringify(dbStores));
    if (!isSuccessWritten) {
        return res.status(404).json({ message: "Failed to write to file." });
    }
    return res.status(201).json(storeToUpdate);
})



module.exports = userRouter;