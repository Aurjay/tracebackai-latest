import { useState } from 'react';
import { Alert, Button } from '@mui/material';

export default async function handler(req, res) {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prompt = event.target.prompt.value.trim();

    if (!process.env.OPENAI_SECRET_KEY) {
      setError('API key is not provided!');
      return;
    }

    if (prompt.length === 0) {
      setError('Provide prompt value!');
      return;
    }

    try {
      const RESULT = "Just some hardcoded response bla bla bla...";
      setResult(RESULT);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {result && <Alert severity="success">{result}</Alert>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="prompt">Prompt:</label>
          <textarea id="prompt" name="prompt" rows="3" />
        </div>
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    </>
  );
};
