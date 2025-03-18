require('dotenv').config();
const { CosmosClient } = require("@azure/cosmos");

// Replace with your Cosmos DB credentials
const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_PRIMARY_KEY;
const databaseId = process.env.DATABASE_ID;
const containerId =process.env.CONTAINER_ID;

const client = new CosmosClient({ endpoint, key });

async function connectDB() {
    try {
          // Access database & container
          const database = client.database(databaseId);
          const container = database.container(containerId);

          console.log("✅ Connected to Cosmos DB!");

            // Insert a test document
        const { resource: newItem } = await container.items.create({
            id: "1",
            name: "Test Item",
            category: "Example"
        });

        console.log("✅ Document Inserted:", newItem);

    } catch (error) {
         console.error("❌ Error connecting to Cosmos DB:", error);
    }
}

connectDB();


const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, Express with dotenv!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
