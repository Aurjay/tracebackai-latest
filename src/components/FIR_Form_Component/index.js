import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import NoSsr from '@mui/material/NoSsr';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

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
  display: flex;
  align-items: center;
`;

const AnswerField = styled(TextField)`
  flex: 1;
`;

const IconWrapper = styled.div`
  margin-left: 1rem;
  cursor: pointer;
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
  });

  const [editableFields, setEditableFields] = useState({
    name: false,
    usecase: false,
    projectType: false,
    dataGeneration: false,
    dataPreprocessing: false,
    training: false,
    postProcessing: false,
    deployment: false,
    concernedPart: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/FIR_text_api');
        const data = await response.text();
        console.log('Fetched data:', data); // Log the fetched data
        if (response.ok) {
          const formValuesData = {};
          data.split('\n').forEach((line) => {
            const [question, answer] = line.split(':');
            formValuesData[question.trim()] = answer.trim();
          });
          console.log('Form values:', formValuesData); // Log the extracted form values
          setFormValues(formValuesData);
        } else {
          console.error('An error occurred while fetching form values:', data.error);
        }
      } catch (error) {
        console.error('An error occurred while fetching form values:', error);
      }
    };

    fetchData();
  }, []);

  const updateTextDocument = async () => {
    try {
      const response = await fetch('/api/FIR_text_api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        // Data successfully sent
        console.log('Data successfully sent.');
      } else {
        // Error sending data
        console.error('Error sending data.');
      }
    } catch (error) {
      console.error('An error occurred while updating the text document:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTextDocument();
  };

  const handleEditField = (fieldId) => {
    setEditableFields({
      ...editableFields,
      [fieldId]: true,
    });
  };

  const handleSaveField = (fieldId) => {
    setEditableFields({
      ...editableFields,
      [fieldId]: false,
    });
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

  return (
  <NoSsr>
    <FormCard>
      {/* Add a heading to indicate the source of the data */}
      <h2 style={{ textAlign: 'center' }}>Data Fetched from Text File</h2>

      {/* Add a separate form section for each question and answer */}
      <form id="form" onSubmit={handleSubmit}>
        {Object.entries(formValues).map(([fieldId, fieldValue]) => (
          <Question key={fieldId}>
            <label htmlFor={fieldId}>{fieldId}:</label>
            <AnswerField
              id={fieldId}
              value={fieldValue}
              onChange={handleChange}
              disabled={!editableFields[fieldId]}
            />
            <IconWrapper>
              {editableFields[fieldId] ? (
                <SaveIcon onClick={() => handleSaveField(fieldId)} />
              ) : (
                <EditIcon onClick={() => handleEditField(fieldId)} />
              )}
            </IconWrapper>
          </Question>
        ))}

        <SubmitButton type="submit" onClick={handleButtonClick}>
          Submit
        </SubmitButton>
      </form>
    </FormCard>
  </NoSsr>
  )
}

export default FormComponent
