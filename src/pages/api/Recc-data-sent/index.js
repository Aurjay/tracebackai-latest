import { Storage } from '@google-cloud/storage';
import path from 'path';

const storageBucketName = 'test-json-latest'; // Update with the correct storage bucket name
const storageFileName = 'saved-recommendations.json'; // Update with the correct JSON file name
const serviceAccountKeyPath = path.join(process.cwd(), 'traceback-ai-FIR.json'); // Update with the path to your service account key file

export default async function handler(req, res) {
  try {
    const { recommendation } = req.body;

    // Create a new instance of the Google Cloud Storage client with the service account key file
    const storage = new Storage({ keyFilename: serviceAccountKeyPath });

    // Get a reference to the bucket
    const bucket = storage.bucket(storageBucketName);

    // Get a reference to the file
    const file = bucket.file(storageFileName);

    // Update the contents of the file with the new recommendation
    const newData = {
      recommendations: [recommendation],
    };

    await file.save(JSON.stringify(newData, null, 2), {
      contentType: 'application/json',
    });

    console.log('Recommendation saved successfully.');
    res.status(200).json({ message: 'Recommendation saved successfully' });
  } catch (error) {
    console.log('An error occurred while saving the recommendation:', error);
    res.status(500).json({ message: 'An error occurred while saving the recommendation' });
  }
}
