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

    // Get the deleted recommendations from the request body
    const { deletedRecommendations } = req.body;

    // Get a reference to the "recommendations" node in the database
    const recommendationsRef = database.ref('recommendations');

    // Fetch all recommendations
    const snapshot = await recommendationsRef.once('value');
    const recommendations = snapshot.val();

    if (recommendations) {
      // Find and delete the recommendations with the specified document names
      const deletedDocNames = [];
      const deletePromises = [];
      deletedRecommendations.forEach((docName) => {
        Object.entries(recommendations).forEach(([key, value]) => {
          if (value.docName === docName) {
            deletePromises.push(recommendationsRef.child(key).remove());
            deletedDocNames.push(docName);
          }
        });
      });

      await Promise.all(deletePromises);

      res.status(200).json({ message: 'Recommendations deleted successfully', deletedDocNames });
    } else {
      res.status(404).json({ message: 'No recommendations found' });
    }
  } catch (error) {
    console.log('An error occurred while deleting the recommendations:', error);
    res.status(500).json({ message: 'An error occurred while deleting the recommendations' });
  }
}
