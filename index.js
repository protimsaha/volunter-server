const express = require('express');
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { process_params } = require('express/lib/router');
require('dotenv').config()

app.use(cors())
app.use(express.json())

var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.e3npc.mongodb.net:27017,cluster0-shard-00-01.e3npc.mongodb.net:27017,cluster0-shard-00-02.e3npc.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-rgtnsu-shard-0&authSource=admin&retryWrites=true&w=majority`;
MongoClient.connect(uri, function (err, client) {

    async function run() {
        await client.connect()
        const volunterCollection = client.db('VolunteerCollection').collection('volunter')

        app.get('/volunters', async (req, res) => {
            const query = {};
            const cursor = volunterCollection.find(query)
            const volunters = await cursor.toArray()
            res.send(volunters)
        })

    }

    run().catch(console.dir)

})


app.get('/', (req, res) => {
    res.send('Running volunter server')
})

app.listen(port, () => {
    console.log('Listening to port ', port)
})