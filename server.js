require('dotenv').config();
const { CosmosClient } = require("@azure/cosmos");
const express = require('express');

// Load environment variables
const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_PRIMARY_KEY;
const databaseId = process.env.DATABASE_ID;
const containerId = process.env.CONTAINER_ID;
const PORT = process.env.PORT || 3000;

// Check if required environment variables are set
if (!endpoint || !key || !databaseId || !containerId) {
    console.error("❌ Missing environment variables! Check your .env file.");
    process.exit(1);
}

// Initialize Cosmos DB client
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

// Connect to DB and insert test data
async function connectDB() {
    try {
        console.log("✅ Connected to Cosmos DB!");

        // Insert a test document (optional)
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

// Start Express server
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, Express with Azure Cosmos DB!');
});

// API route to fetch all documents
app.get('/items', async (req, res) => {
    try {
        const { resources } = await container.items.readAll().fetchAll();
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch items" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    connectDB(); // Connect to DB when server starts
});
