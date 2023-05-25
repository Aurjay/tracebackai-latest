import { Storage } from '@google-cloud/storage';

export default async function handler(req, res) {
  const storage = new Storage({
    keyFilename: 'traceback-ai-FIR.json', // Update with your own service account key file path
    projectId: 'traceback-ai-gpt', // Update with your Google Cloud project ID
  });

  const bucketName = 'fir-text-007';
  const fileName = 'FIR-GPT.txt';

  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    const formValues = {
      name: req.body.name || 'free',
      usecase: req.body.usecase || '',
      projectType: req.body.projectType || '',
      dataGeneration: req.body.dataGeneration || '',
      dataPreprocessing: req.body.dataPreprocessing || '',
      training: req.body.training || '',
      postProcessing: req.body.postProcessing || '',
      deployment: req.body.deployment || '',
      concernedPart: req.body.concernedPart || '',
      answer: req.body.answer || '', // Include the answer field value
    };

    // Generate the text content with form values
    let textContent = '';
    for (const [question, answer] of Object.entries(formValues)) {
      textContent += `${question}: ${answer}\n`;
    }

    // Save the text content to the file, overwriting the existing content
    await file.save(textContent);

    // Download the updated file content
    const [updatedFileContent] = await file.download();
    console.log('Text file content:', updatedFileContent.toString());

    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('An error occurred while updating the data:', error);
    res.status(500).json({ error: 'Error updating data' });
  }
}
