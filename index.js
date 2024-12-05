const express = require('express');
const app = express();
const PORT = process.env.PORT || 6012;
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Connection URI
const uri = `mongodb+srv://${process.env.DB_FITNESS_USER}:${process.env.DB_FITNESS_PASSWORD}@cluster0.7olulz0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// MongoClient Configuration
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // Connect to the MongoDB server
        await client.connect();

        // Define the collection
        const trainerInformation = client.db('Fitness_tracker_data').collection('trainer_info');

        // Define the /trainerInfo route
        app.get('/trainerInfo', async (req, res) => {
            try {
                const cursor = trainerInformation.find(); 
                const result = await cursor.toArray(); 
                res.send(result); 
                console.log("Your result is:", result);
            } catch (error) {
                console.error("Failed to fetch trainer info:", error.message);
                res.status(500).send({ error: "Failed to fetch trainer info" });
            }
        });

        console.log("Pinged your deployment. Successfully connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
    }
}

// Run the MongoDB connection function
run().catch(console.dir);

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
