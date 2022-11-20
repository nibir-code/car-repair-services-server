const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT||5000;


//MIDDLEWARE
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nt4kotb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
     try {
       const database = client.db("carMechanic");
       const serviceCollection = database.collection("services");
       //GET API
       app.get('/services', async (req, res)=>{
          const cursor = serviceCollection.find({});
          const services = await cursor.toArray();
          res.send(services);
          
       })
       //GET SINGLE SERVICE
       app.get('/services/:id', async (req,res)=>{
          const id = req.params.id;
          const query ={_id:ObjectId(id)};
          const service = await serviceCollection.findOne(query);
          res.json(service);
       })

       // POST API
      app.post('/services',async (req,res)=>{
          const service = req.body;
          console.log('hit',service);
          const result = await serviceCollection.insertOne(service);
          console.log(`A document was inserted with the _id: ${result.insertedId}`);
          res.json(result);
      })
      //DELETE API
      app.delete('/services',async (req,res)=>{
         const id = req.params.id;
         const query = { _id:ObjectId(id)};
         const result = await serviceCollection.deleteOne(query);
         res.json(result);
      })
       
     } finally {
       //await client.close();
     }
   }
   run().catch(console.dir);



app.get('/', (req, res) => {
     res.send('running');
} 
)

app.listen(port, () => {
     console.log('running on port',port);
})
 