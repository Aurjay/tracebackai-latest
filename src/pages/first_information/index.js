import React, { useState } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const FormCard = styled(Card)`
  padding: 2rem;
  margin: 0rem auto;
  width: 80%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px; /* Add border radius for curved edges */
`;

const Question = styled.div`
  margin-bottom: 1rem;
`;

const AnswerField = styled(TextField)`
  width: 100%;
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #ffffff;
  background-color: #ff0000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const FormComponent = () => {
  const [name, setName] = useState('');
  const [usecase, setUsecase] = useState('');
  const [projectType, setProjectType] = useState('');
  const [dataGeneration, setDataGeneration] = useState('');
  const [dataPreprocessing, setDataPreprocessing] = useState('');
  const [training, setTraining] = useState('');
  const [postProcessing, setPostProcessing] = useState('');
  const [deployment, setDeployment] = useState('');
  const [concernedPart, setConcernedPart] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Function to update the Google Cloud Text document
  const updateTextDocument = () => {
    // Perform the necessary steps to update the text document in Google Cloud
    // This could involve making an API call or using a cloud storage library
    // to write the updated answers to the text document
    // Ensure proper authentication and authorization is in place

    // Simulating successful submission
    setSubmissionSuccess(true);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the Google Cloud Text document
    updateTextDocument();
  };

  return (
    <FormCard>
      <h2 style={{ textAlign: 'center' }}>Fill the form in your own words.</h2>
      <form onSubmit={handleSubmit}>
        <Question>
          <label htmlFor="name">Name:</label>
          <AnswerField
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Question>

        <Question>
          <label htmlFor="usecase">Usecase:</label>
          <AnswerField
            id="usecase"
            value={usecase}
            onChange={(e) => setUsecase(e.target.value)}
          />
        </Question>

        <Question>
          <label htmlFor="projectType">Type of the AI Project:</label>
          <AnswerField
            id="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          />
        </Question>

        <Question>
          <label htmlFor="dataGeneration">Data Generation and Accumulation:</label>
          <AnswerField
            id="dataGeneration"
            value={dataGeneration}
            onChange={(e) => setDataGeneration(e.target.value)}
          />
        </Question>

        <Question>
          <label htmlFor="dataPreprocessing">Data Preprocessing:</label>
          <AnswerField
            id="dataPreprocessing"
            value={dataPreprocessing}
            onChange={(e) => setDataPreprocessing(e.target.value)}
          />
        </Question>

        <Question>
          <label htmlFor="training">Training:</label>
          <AnswerField
            id="training"
            value={training}
            onChange={(e) => setTraining(e.target.value)}
          />
        </Question>

        <Question>
          <label htmlFor="postProcessing">Post Processing:</label>
          <AnswerField
            id="postProcessing"
            value={postProcessing}
            onChange={(e) => setPostProcessing(e.target.value)}
          />
        </Question>

        <Question>
          <label htmlFor="deployment">Deployment:</label>
          <AnswerField
            id="deployment"
            value={deployment}
            onChange={(e) => setDeployment(e.target.value)}
          />
        </Question>

        <Question>
          <label htmlFor="concernedPart">Part of the pipeline that concerns you:</label>
          <AnswerField
            id="concernedPart"
            value={concernedPart}
            onChange={(e) => setConcernedPart(e.target.value)}
          />
        </Question>

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>

      {submissionSuccess && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          Submission successful!
        </div>
      )}
    </FormCard>
  );
};

export default FormComponent;
