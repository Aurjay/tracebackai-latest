import admin from 'firebase-admin';
import path from 'path';

const firebaseDatabaseURL = 'https://traceback-ai-43af3-default-rtdb.europe-west1.firebasedatabase.app/'; // Replace with your Firebase Realtime Database URL

// Update with the path to your service account key file
const serviceAccountKeyPath = path.join(process.cwd(), 'traceback-ai-rtd.json');

// Initialize the Firebase Admin SDK
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKeyPath),
    databaseURL: firebaseDatabaseURL,
  });
}

export default async function handler(req, res) {
  try {
    // Get a reference to the Firebase Realtime Database
    const database = admin.database();

    // Get a reference to the "recommendations" node in the database
    const recommendationsRef = database.ref('recommendations');

    // Fetch all the recommendations
    const snapshot = await recommendationsRef.once('value');
    const recommendations = snapshot.val();

    // Transform the recommendations into an array with document names
    const recommendationsArray = Object.entries(recommendations).map(([docName, recommendation]) => ({
      docName,
      ...recommendation,
    }));

    console.log('Fetched recommendations:', recommendationsArray);
    res.status(200).json(recommendationsArray);
  } catch (error) {
    console.log('An error occurred while fetching the recommendations:', error);
    res.status(500).json({ message: 'An error occurred while fetching the recommendations' });
  }
}
