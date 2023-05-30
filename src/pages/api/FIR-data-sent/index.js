import { Storage } from '@google-cloud/storage';
import path from 'path';

const storageBucketName = 'test-json-latest'; // Update with the correct storage bucket name
const storageFileName = 'test.json'; // Update with the correct JSON file name
const serviceAccountKeyPath = path.join(process.cwd(), 'traceback-ai-FIR.json'); // Update with the path to your service account key file

export default async function handler(req, res) {
  try {
    const { name, usecase, projectType, dataGeneration, dataPreprocessing, training, postProcessing, deployment, concernedPart } = req.body;

    console.log('name:', name);
    console.log('usecase:', usecase);
    console.log('projectType:', projectType);
    console.log('dataGeneration:', dataGeneration);
    console.log('dataPreprocessing:', dataPreprocessing);
    console.log('training:', training);
    console.log('postProcessing:', postProcessing);
    console.log('deployment:', deployment);
    console.log('concernedPart:', concernedPart);

    // Create a new JSON object with the data from the request body
    const newData = {
      name,
      usecase,
      projectType,
      dataGeneration,
      dataPreprocessing,
      training,
      postProcessing,
      deployment,
      concernedPart,
    };

    // Log the final JSON data before updating the file
    console.log('Final JSON:', JSON.stringify(newData, null, 2));

    // Create a new instance of the Google Cloud Storage client with the service account key file
    const storage = new Storage({ keyFilename: serviceAccountKeyPath });

    // Get a reference to the bucket
    const bucket = storage.bucket(storageBucketName);

    // Get a reference to the file
    const file = bucket.file(storageFileName);

    // Update the contents of the file with the new JSON data
    await file.save(JSON.stringify(newData, null, 2), {
      contentType: 'application/json',
    });

    console.log('Data sent successfully.');
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.log('An error occurred while updating the data:', error);
    res.status(500).json({ message: 'An error occurred while saving data' });
  }
}
