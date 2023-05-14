import { MongoClient, ObjectId } from 'mongodb';


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  if (!client.isConnected()) {
    console.log("Db connected...")
    await client.connect();
  }
  const dbName = "eu-ai-act"

  return client.db(dbName);
}

export default async function handler(req, res) {
  const db = await connectToDatabase();
  console.log(`Connected to MongoDB database "${db.databaseName}"`)
  if (req.method === 'GET') {
    const ai_act_data = await db.collection('articles').find({ }).toArray();
    res.status(200).json(ai_act_data);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
