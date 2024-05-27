const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.da6po2r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // ***************************code write here*************************** 
    const database = client.db("fruitable-ecommerce");
    const categoryCollection = database.collection("category");
    const productsCollection = database.collection("products");
    const reviewCollection = database.collection("reviews");
    const ordersCollection = database.collection("orders");
    const bannerOfferProduct = database.collection("banner-offer");


    // ########################## all post api are write here ###############################
    app.post('/category', async(req, res) => {
        const postCategory = req.body;
        console.log(postCategory);
        const result = await categoryCollection.insertOne(postCategory);
        res.send(result);
    });

    app.post('/products', async(req, res) => {
        const postProduct = req.body;
        console.log(postProduct);
        const result = await productsCollection.insertOne(postProduct);
        res.send(result);
    });

    app.post('/reviews', async(req, res) => {
        const postReview = req.body;
        console.log(postReview);
        const result = await reviewCollection.insertOne(postReview);
        res.send(result);
    });

    app.post('/orders', async(req, res) => {
        const postOrder = req.body;
        console.log(postOrder);
        const result = await ordersCollection.insertOne(postOrder);
        res.send(result);
    });

    app.post('/bannerOffer', async(req, res) => {
      const postBannerOffer = req.body;
      console.log(postBannerOffer);
      const result = await bannerOfferProduct.insertOne(postBannerOffer);
      res.send(result);
    });

    // ####################### all get api are write here ######################### 

    app.get('/category', async(req, res) => {
        const getCaegory = categoryCollection.find();
        const result = await getCaegory.toArray();
        res.send(result);
    });

    app.get('/products', async(req, res) => {
        const getProducts = productsCollection.find();
        const result = await getProducts.toArray();
        res.send(result);
    });

    app.get('/reviews', async(req, res) => {
        const getReviews = reviewCollection.find();
        const result = await getReviews.toArray();
        res.send(result);
    });

    app.get('/orders', async(req, res) => {
        const getOrders = ordersCollection.find();
        const result = await getOrders.toArray();
        res.send(result);
    });

    app.get('/bannerOffer', async(req, res) => {
      const getBannerOffer = bannerOfferProduct.find();
      const result = await getBannerOffer.toArray();
      res.send(result);
    });



  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.get('/', (req, res) => {
  res.send('Server Running...!!!')
})

app.listen(port, () => {
  console.log(`Express Server Running ${port}`)
})