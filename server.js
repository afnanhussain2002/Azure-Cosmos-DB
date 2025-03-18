require('dotenv').config();
const { CosmosClient } = require("@azure/cosmos");

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, Express with dotenv!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
