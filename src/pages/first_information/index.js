import React, { useState } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import NoSsr from '@mui/material/NoSsr';

const FormCard = styled(Card)`
  padding: 2rem;
  margin: 0rem auto;
  width: 80%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
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
  const [formValues, setFormValues] = useState({
    name: '',
    usecase: '',
    projectType: '',
    dataGeneration: '',
    dataPreprocessing: '',
    training: '',
    postProcessing: '',
    deployment: '',
    concernedPart: '',
    answer: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form Values:', formValues);

    // Manually trigger form submission after console logs
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.click();
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
    console.log('Form Values:', formValues);
  };

  return (
    <NoSsr>
      <FormCard>
        <form onSubmit={handleSubmit}>
          <Question>
            <label htmlFor="name">Name:</label>
            <AnswerField id="name" value={formValues.name} onChange={handleChange} />
          </Question>

          <Question>
            <label htmlFor="usecase">Use Case:</label>
            <AnswerField id="usecase" value={formValues.usecase} onChange={handleChange} />
          </Question>

          <Question>
            <label htmlFor="projectType">Project Type:</label>
            <AnswerField id="projectType" value={formValues.projectType} onChange={handleChange} />
          </Question>

          <Question>
            <label htmlFor="dataGeneration">Data Generation:</label>
            <AnswerField id="dataGeneration" value={formValues.dataGeneration} onChange={handleChange} />
          </Question>

          <Question>
            <label htmlFor="dataPreprocessing">Data Preprocessing:</label>
            <AnswerField id="dataPreprocessing" value={formValues.dataPreprocessing} onChange={handleChange} />
          </Question>

          <Question>
            <label htmlFor="training">Training:</label>
            <AnswerField id="training" value={formValues.training} onChange={handleChange} />
          </Question>

          <Question>
            <label htmlFor="postProcessing">Post Processing:</label>
            <AnswerField id="postProcessing" value={formValues.postProcessing} onChange={handleChange} />
          </Question>

          <Question>
            <label htmlFor="deployment">Deployment:</label>
            <AnswerField id="deployment" value={formValues.deployment} onChange={handleChange} />
          </Question>

          <Question>
            <label htmlFor="concernedPart">Concerned Part:</label>
            <AnswerField id="concernedPart" value={formValues.concernedPart} onChange={handleChange} />
          </Question>

          <Question>
            <label htmlFor="answer">Answer:</label>
            <AnswerField id="answer" value={formValues.answer} onChange={handleChange} />
          </Question>

          <SubmitButton type="submit">
            Submit
          </SubmitButton>
        </form>
      </FormCard>
    </NoSsr>
  );
};

export default FormComponent;
