
const express = require('express');
const path = require('path');
const cors = require('cors');
// const cors = require('cors');

const POST = process.env.PORT || 5000;

const server = express();
server.use(express.json()); // to make it work with body parameters
server.use(cors());
// server.use(cors());


//הגדרת קבצים סטטיים
server.use(express.static(path.join(__dirname, 'dist')));

// http://localhost:5000/api/store
//if include /api/store going to the Routes/store
server.use(`/api/store`,require(`./Routes/store`))


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



server.get('/*', async (req, res) => {
    try {
        res.status(200).sendFile(path.join(__dirname, 'dist', 'index.html'));
    } catch (error) {
        res.status(500).json(error);

    }
});


server.listen(POST, () => {
    console.log(`http://localhost:${POST}`);
})