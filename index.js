const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

// user: mydbuser1
// pass: VX6Sr3SYRJzBy6UV

const uri = "mongodb+srv://mydbuser1:VX6Sr3SYRJzBy6UV@cluster0.s2e3l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db("foodMaster");
        const usersCollection = database.collection("users");

        app.post('/users', async (req, res) => {
            const newUser = req.body
            console.log('hitting the post api', req.body)
            const result = await usersCollection.insertOne(newUser);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.send('post api called')
        });

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running my CRUD Server');
});

app.listen(port, () => {
    console.log('Running Server on port', port);
})