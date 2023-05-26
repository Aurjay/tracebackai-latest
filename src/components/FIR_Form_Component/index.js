import React, { useState, useEffect } from 'react';
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

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 4px;
  z-index: 999;
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
    answer: '', // Include the answer field in formValues state
  });

  const [showPopup, setShowPopup] = useState(false);
  const [isDataSent, setIsDataSent] = useState(false);
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/FIR_text_api');
        const data = await response.json();
        if (response.ok) {
          setFileContent(data.data);
        } else {
          console.error('An error occurredd while fetching FIR-GPT.txt:', data.error);
        }
      } catch (error) {
        console.error('An error occurred while fetching FIR-GPT.txt:', error);
      }
    };

    fetchData();
  }, []);

  const updateTextDocument = async () => {
    try {
      const response = await fetch('/api/updateFirData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Change the content type to 'application/json'
        },
        body: JSON.stringify(formValues), // Send the form values as JSON in the request body
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

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTextDocument();
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const handleButtonClick = () => {
    const form = document.getElementById('form');
    form.dispatchEvent(new Event('submit'));
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <NoSsr>
      <FormCard>
        <h2 style={{ textAlign: 'center' }}>Fill the form in your own words.</h2>
        <form id="form" onSubmit={handleSubmit}>
          <Question>
            <label htmlFor="name">Project Name:</label>
            <AnswerField id="name" value={formValues.name} onChange={handleChange} />
          </Question>

          <Question>
            <label htmlFor="usecase">AI Usecase (Domain):</label>
            <AnswerField id="usecase" value={formValues.usecase} onChange={handleChange} />
          </Question>

          <Question>
            <label htmlFor="projectType">Type of the AI Project:</label>
            <AnswerField id="projectType" value={formValues.projectType} onChange={handleChange} />
          </Question>

          <Question>
            <label htmlFor="dataGeneration">Data Generation and Accumulation:</label>
            <AnswerField
              id="dataGeneration"
              value={formValues.dataGeneration}
              onChange={handleChange}
            />
          </Question>

          <Question>
            <label htmlFor="dataPreprocessing">Data Preprocessing:</label>
            <AnswerField
              id="dataPreprocessing"
              value={formValues.dataPreprocessing}
              onChange={handleChange}
            />
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
            <label htmlFor="concernedPart">Part of the pipeline that concerns you:</label>
            <AnswerField id="concernedPart" value={formValues.concernedPart} onChange={handleChange} />
          </Question>

          <Question>
            <label htmlFor="answer">Answer:</label> {/* Add the answer field */}
            <AnswerField id="answer" value={formValues.answer} onChange={handleChange} /> {/* Bind the value and onChange event */}
          </Question>

          <SubmitButton type="button" onClick={handleButtonClick}>
            Submit
          </SubmitButton>
        </form>

        {showPopup && (
          <Popup>
            {isDataSent ? 'Data sent!' : 'Data not sent!'}
            <br />
            <button onClick={closePopup}>Close</button>
          </Popup>
        )}
      </FormCard>
    </NoSsr>
  );
};

export default FormComponent;
