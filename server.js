require('dotenv').config();
const { CosmosClient } = require("@azure/cosmos");

// Replace with your Cosmos DB credentials
const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_PRIMARY_KEY;
const databaseId = process.env.DATABASE_ID;
const containerId =process.env.CONTAINER_ID;

const client = new CosmosClient({ endpoint, key });


const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, Express with dotenv!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
