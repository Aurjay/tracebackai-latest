const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

const imagePath = '/path/to/your/image.jpg';
const mongoConnectionString = 'mongodb://localhost:27017';
const databaseName = 'your_database_name';
const collectionName = 'your_collection_name';

fs.readFile(imagePath, 'base64', (err, base64Data) => {
  if (err) {
    console.error(err);

    return;
  }

  MongoClient.connect(mongoConnectionString, (err, client) => {
    if (err) {
      console.error(err);
      
      return;
    }

    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    const document = {
      imageData: base64Data
    };

    collection.insertOne(document, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Image data inserted into MongoDB');
      }

      client.close();
    });
  });
});
