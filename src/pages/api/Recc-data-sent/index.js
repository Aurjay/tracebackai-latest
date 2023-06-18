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
    const { recommendation } = req.body;

    // Get a reference to the Firebase Realtime Database
    const database = admin.database();

    // Get a reference to the "recommendations" node in the database
    const recommendationsRef = database.ref('recommendations');

    // Push the new recommendation data under a new child node
    const newRecommendationRef = recommendationsRef.push();
    await newRecommendationRef.set({
      data: recommendation,
      timestamp: admin.database.ServerValue.TIMESTAMP,
    });

    console.log('Recommendation saved successfully.');
    res.status(200).json({ message: 'Recommendation saved successfully' });
  } catch (error) {
    console.log('An error occurred while saving the recommendation:', error);
    res.status(500).json({ message: 'An error occurred while saving the recommendation' });
  }
}
