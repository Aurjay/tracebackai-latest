import { Storage } from '@google-cloud/storage';
import path from 'path';

const storageBucketName = 'test-json-latest'; // Update with the correct storage bucket name
const storageFileName = 'saved-recommendations.json'; // Update with the correct JSON file name
const serviceAccountKeyPath = path.join(process.cwd(), 'traceback-ai-FIR.json'); // Update with the path to your service account key file

export default async function handler(req, res) {
  try {
    // Create a new instance of the Google Cloud Storage client with the service account key file
    const storage = new Storage({ keyFilename: serviceAccountKeyPath });

    // Get a reference to the bucket
    const bucket = storage.bucket(storageBucketName);

    // Get a reference to the file
    const file = bucket.file(storageFileName);

    // Download the file contents
    const [fileContent] = await file.download();

    // Parse the JSON content
    const existingData = JSON.parse(fileContent.toString());

    // Log the existing data
    console.log('Received data:', existingData);

    // Return the existing data as the response
    res.status(200).json(existingData);
  } catch (error) {
    console.log('An error occurred while fetching the data:', error);
    res.status(500).json({ message: 'An error occurred while fetching data' });
  }
}
