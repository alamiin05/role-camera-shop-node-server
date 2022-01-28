const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.krkkv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("connected to database");
    const database = client.db("Camerashop");
    const cameracollection = database.collection("cameraCollection");

    // const bookingCollection = database.collection("bookPackges");
      
    // get packages

      app.get("/camerastore", async (req, res) => {
      const cursor = cameracollection.find({});
      const camerastore = await cursor.toArray();
      res.send(camerastore);
    });

    // GET singel packages
    app.get("/camerastore/:id", async (req, res) => {
      const id = req.params.id;
      console.log("getting specific service", id);
      const query = { _id: ObjectId(id) };
      const camerastore = await cameracollection.findOne(query);
      console.log("load user id", id);
      res.send(camerastore);
    });

    // // POST  Packages
    // app.post("/packages", async (req, res) => {
    //   const packages = req.body;
    //   console.log("hitted", packages);

    //   const result = await pakagesCollection.insertOne(packages);
    //   console.log(result);
    //   res.json(result);
    // });

    //confrom order
    // app.post("/confirmPackages", async (req, res) => {
    //   const result = await bookingCollection.insertOne(req.body);
    //   console.log(result);
    // });
    //get order from email
    // app.get("/myorder/:email", async (req, res) => {
    //   const result = await bookingCollection
    //     .find({ email: req.params.email })
    //     .toArray();
    //   res.send(result);
    // });

    // DELETE order from data basaed
    // app.delete("/myorder/:id", async (req, res) => {
    //   const id = req.params.id;
    //   console.log(id);
    //   const query = { _id: ObjectId(id) };
    //   const result = await bookingCollection.deleteOne(query);
    //   console.log(result);
    //   res.json(result);
    // });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running Camera Shop Server");
});

app.listen(port, () => {
  console.log("Running Camera Server on port", port);
});
