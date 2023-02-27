//  send request to /api/new-meetup
//  will trigger the func inside
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method !== "POST") return;

  const data = req.body;

  const client = await MongoClient.connect(
    "mongodb+srv://jeffnext:lGvXSLjT9OKYVXNO@cluster.psx2gf1.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const result = await meetupsCollection.insertOne(data);
  console.log(result);

  client.close();

  res.status(201).json({
    message: "success saved!",
  });
}

export default handler;
