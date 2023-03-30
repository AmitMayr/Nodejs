const storesPath = "./db/stores.json"; 
let dbStores = require(storesPath); //gets the db json file

var fs = require('fs');    //to write to the db json file.
const express = require('express');
const path = require('path');

const POST = process.env.PORT || 5000;

const server = express();
server.use(express.json()); // to make it work with body parameters



server.get(`/api/store`, async (req, res) => { // shows all the stores and items.
    if (dbStores)
        res.status(200).json(dbStores);
    else{
        res.status(404).json({ message: "error getting the json file or the file is empty" });
    }

});

server.get(`/api/store/:id`, async (req, res) => {//shoes the store that match the given id
    let { id } = req.params;
    id = parseInt(id);
    let shop = dbStores.find((shop) => shop.id === id);
    if (shop) {
        res.status(200).json(shop);
    }
    else {
        res.status(404).json({ message: "shop not found" });
    }

});

server.get(`/api/stores/:store/:item`, async (req, res) => {//shows spec item from a spec store
    let { store, item } = req.params;
    let shop = dbStores.find((shop) => shop.name === store);//looking for shop with name of the parameter store
    if (!shop) {//if no store matched
        res.status(404).json({ message: "shop not found" });
        return;
    }
    let product = shop.items.find((elem) => elem.name === item);//looking for item with name of the parameter item
    if (!product) {//if no item matched
        res.status(404).json({ message: "item not found in the shop" });
        return;
    }
    res.status(200).json(product);//if found the item display it
});

server.post(`/api/store/add`, async (req, res) => {//add store by getting json in body with id,name and city
    let { id, name, city } = req.body;
    let isAlreadyExists = dbStores.find((store) => store.id === id)//checks if the id exists already
    if(isAlreadyExists){
        res.status(404).json({ message: "the id of store already exists" });
        return;
    }
    let newStore = {
        id: id, name: name, city: city, items: [],
    };
    dbStores.push(newStore)
    fs.writeFile(storesPath, JSON.stringify(dbStores), (err) => {//update the json file with the new store
        if (err) return   res.status(404).json({ message: "error adding the store" });
      });

    res.status(201).json(dbStores);//if added succesfully give status 201 and show the new stores array
})



server.post(`/api/store/:store/items/add`, async (req, res) => {//add item to a store
    let { store } = req.params; // gets the store id from the query
    let { itemId, itemName, itemPrice,itemSalePrice } = req.body; //gets the new item json params from the body [Thunder client]
    store = parseInt(store);//cast the id from query to int to compare
    let storeToUpdate = dbStores.find((shop) => shop.id === store)
    if(!storeToUpdate){
        res.status(404).json({ message: "the id of store do not exists" });
        return;
    }
    let isItemExists = storeToUpdate.items.find((storeToUpdate) => storeToUpdate.id === itemId || storeToUpdate.name === itemName)
    if(isItemExists){
        res.status(404).json({ message: "the item already exists" });
        return;
    }
    let newItem = {
        id: itemId, name: itemName, price: itemPrice, salePrice: itemSalePrice,
    }
    storeToUpdate.items.push(newItem)
    fs.writeFile(storesPath, JSON.stringify(dbStores), (err) => {
        if (err) return   res.status(404).json({ message: "error adding the store" });
      });
    res.status(201).json(dbStores);
})


server.get(`/about(.html)?`, async (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'about.html'));
});

server.get(`^/$|index(.html)?`, async (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'));
});

server.get(`/users`, async (req, res) => {
    let users = [
        { id: 1, name: "Amit" }, { id: 2, name: "Gal" }
    ];
    res.status(200).json(users);
})


server.get(`/users/:name`, async (req, res) => {
    let { name } = req.params;
    // let name = req.params,name;
    let users = [
        { id: 1, name: "Amit" }, { id: 2, name: "Gal" }
    ];
    let user = users.find((user) => user.name === name);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({ message: "user not found" });
    }
})

server.post(`/users/add`, async (req, res) => {
    let users = [];
    let { id, name } = req.body;
    let user = { id, name };
    users.push(user);
    res.status(201).json(users);
})

server.get(`/*`, async (req, res) => {//if we go to link that not defined display the 404 html page
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

server.listen(POST, () => {
    console.log(`http://localhost:${POST}`);
})