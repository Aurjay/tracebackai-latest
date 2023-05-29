import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import NoSsr from '@mui/material/NoSsr';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Snackbar from '@mui/material/Snackbar';

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
  display: flex;
  align-items: center;
`;

const AnswerField = styled(TextField)`
  flex: 1;
  min-height: 100px;
  textarea {
    resize: vertical;
  }
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
  top: 60%;
  left: 60%;
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

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/FIR_text_api');
        const data = await response.text();
        console.log('Fetched data:', data);
        if (response.ok) {
          const formValuesData = {};
          data.split('\n').forEach((line) => {
            const [question, answer] = line.split(':');
            formValuesData[question.trim()] = answer.trim();
          });
          console.log('Form values:', formValuesData);
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
        console.log('Data successfully sent.');
        handleSnackbarOpen('Data saved successfully');
      } else {
        console.error('Error sending data.');
        handleSnackbarOpen('Error saving data');
      }
    } catch (error) {
      console.error('An error occurred while updating the text document:', error);
      handleSnackbarOpen('Error saving data');
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

  const handleSnackbarOpen = (message) => {
    setSnackbarOpen(true);
    setSnackbarMessage(message);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <NoSsr>
      <FormCard>
        <h2 style={{ textAlign: 'center' }}>Data Fetched from Text File</h2>
        <form id="form" onSubmit={handleSubmit}>
          {Object.entries(formValues).map(([fieldId, fieldValue]) => (
            <div key={fieldId}>
              <Question>
                <label htmlFor={fieldId}>{fieldId}:</label>
              </Question>
              <Question>
                <AnswerField
                  id={fieldId}
                  value={fieldValue}
                  onChange={handleChange}
                  disabled={!editableFields[fieldId]}
                  multiline
                  rows={4}
                />
                <IconWrapper>
                  {editableFields[fieldId] ? (
                    <SaveIcon onClick={() => handleSaveField(fieldId)} />
                  ) : (
                    <EditIcon onClick={() => handleEditField(fieldId)} />
                  )}
                </IconWrapper>
              </Question>
            </div>
          ))}
          <SubmitButton type="submit" onClick={handleButtonClick}>
            Submit
          </SubmitButton>
          <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
          />
        </form>
      </FormCard>
    </NoSsr>
  );
};

export default FormComponent;
