import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  keyFilename: 'traceback-ai-FIR.json', // Update with your own service account key file path
  projectId: 'traceback-ai-gpt', // Update with your Google Cloud project ID
});

const bucketName = 'fir-text-007';
const fileName = 'FIR-GPT.txt';

export default async function handler(req, res) {
  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    const formValues = {
      name: req.body.name || '',
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

    // Log form values
    for (const [question, answer] of Object.entries(formValues)) {
      console.log("question and answer ", question, answer);
    }

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

const updateTextDocument = async (formValues, setIsDataSent, setShowPopup) => {
  try {
    console.log('Form Values:', formValues);

    const response = await fetch('/api/FIR_text_api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });

    if (response.ok) {
      setIsDataSent(true);
    } else {
      setIsDataSent(false);
    }
  } catch (error) {
    console.error('An error occurred while updating the text document:', error);
    setIsDataSent(false);
  } finally {
    setShowPopup(true);
  }
};
