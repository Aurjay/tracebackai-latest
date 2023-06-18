import { IncomingForm } from 'formidable';
import { Storage } from '@google-cloud/storage';
import path from 'path';

// Update with the path to your service account key file
const serviceAccountKeyPath = path.join(process.cwd(), 'traceback-ai-FIR.json');

// Initialize the Google Cloud Storage client
const storage = new Storage({ keyFilename: serviceAccountKeyPath });
const bucketName = 'test-json-latest'; // Replace with your Google Cloud Storage bucket name
const bucket = storage.bucket(bucketName);

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('An error occurred while parsing the form:', err);
        res.status(500).json({ message: 'An error occurred while parsing the form' });

        return;
      }

      try {
        const file = files.file;
        if (!file) {
          res.status(400).json({ message: 'No file found in the request' });
          
          return;
        }

        const fileName = file.name;
        const fileRef = bucket.file(`files/${fileName}`);

        const writeStream = fileRef.createWriteStream({
          metadata: {
            contentType: file.type,
          },
        });

        writeStream.on('error', (error) => {
          console.error('An error occurred while uploading the file:', error);
          res.status(500).json({ message: 'An error occurred while uploading the file' });
        });

        writeStream.on('finish', async () => {
          // Get the file download URL
          const downloadURL = `https://storage.googleapis.com/${bucketName}/${fileRef.name}`;

          console.log('File uploaded successfully:', downloadURL);
          res.status(200).json({ downloadURL });
        });

        writeStream.end(file.data);
      } catch (error) {
        console.error('An error occurred while uploading the file:', error);
        res.status(500).json({ message: 'An error occurred while uploading the file' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
