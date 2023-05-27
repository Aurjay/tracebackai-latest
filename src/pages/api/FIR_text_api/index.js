import axios from 'axios';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const response = await axios.get('https://storage.googleapis.com/fir_reccomendation/fir_text.txt');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send(response.data);
    } else if (req.method === 'POST') {
      const { body } = req;
      const formValues = JSON.parse(body);

      const response = await axios.get('https://storage.googleapis.com/fir_reccomendation/fir_text.txt');
      const fileContent = response.data;

      // Update the file content with the modified values
      let updatedFileContent = fileContent;
      Object.keys(formValues).forEach((question) => {
        const answer = formValues[question];
        updatedFileContent = updatedFileContent.replace(new RegExp(`${question}:.*`), `${question}: ${answer}`);
      });

      // Write the updated file content back to the text file
      await axios.put('https://storage.googleapis.com/fir_reccomendation/fir_text.txt', updatedFileContent);

      res.status(200).send('Data updated successfully');
    } else {
      res.status(404).send('Endpoint not found');
    }
  } catch (error) {
    res.status(500).send('Error accessing data');
  }
}
