import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://Traceback-ai-db-user1:Ilikethanos007%40@traceback-ai-db.d5r5prs.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function connectToDatabase() {
  if (!client.isConnected()) {
    await client.connect();
  }

  return client.db();
}

export default async function handler(req, res) {
  const db = await connectToDatabase();

  if (req.method === 'GET') {
    const test = await db.collection('test1').findOne({ _id: ObjectId('645f46839c555b46b4306671') });
    res.status(200).json(test);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
