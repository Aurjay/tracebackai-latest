import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import NoSsr from '@mui/material/NoSsr';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';

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

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
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
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/FIR-data-receive');
        if (response.ok) {
          const data = await response.json();
          setFormValues(data);
          setEditableFields(Object.keys(data).reduce((obj, key) => {
            obj[key] = false;
            
            return obj;
          }, {}));
        } else {
          console.error('Error fetching data:', response.status);
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/FIR-data-sent', {
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
        console.error('Error sending data:', response.status);
        handleSnackbarOpen('Error saving data');
      }
    } catch (error) {
      console.error('An error occurred while sending data:', error);
      handleSnackbarOpen('Error saving data');
    }
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

  if (isLoading) {
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    );
  }

  return (
    <NoSsr>
      <FormCard>
        <h2 style={{ textAlign: 'center' }}>Data Fetched from Text File</h2>
        <form id="form" onSubmit={handleSubmit}>
          <Question>
            <label htmlFor="name">Name:</label>
          </Question>
          <Question>
            <AnswerField
              id="name"
              value={formValues.name}
              onChange={handleChange}
              disabled={!editableFields.name}
              multiline
              rows={4}
            />
            <IconWrapper>
              {editableFields.name ? (
                <SaveIcon onClick={() => handleSaveField('name')} />
              ) : (
                <EditIcon onClick={() => handleEditField('name')} />
              )}
            </IconWrapper>
          </Question>

          <Question>
            <label htmlFor="usecase">Usecase:</label>
          </Question>
          <Question>
            <AnswerField
              id="usecase"
              value={formValues.usecase}
              onChange={handleChange}
              disabled={!editableFields.usecase}
              multiline
              rows={4}
            />
            <IconWrapper>
              {editableFields.usecase ? (
                <SaveIcon onClick={() => handleSaveField('usecase')} />
              ) : (
                <EditIcon onClick={() => handleEditField('usecase')} />
              )}
            </IconWrapper>
          </Question>

          <Question>
            <label htmlFor="projectType">Project Type:</label>
          </Question>
          <Question>
            <AnswerField
              id="projectType"
              value={formValues.projectType}
              onChange={handleChange}
              disabled={!editableFields.projectType}
              multiline
              rows={4}
            />
            <IconWrapper>
              {editableFields.projectType ? (
                <SaveIcon onClick={() => handleSaveField('projectType')} />
              ) : (
                <EditIcon onClick={() => handleEditField('projectType')} />
              )}
            </IconWrapper>
          </Question>

          <Question>
            <label htmlFor="dataGeneration">Data Generation:</label>
          </Question>
          <Question>
            <AnswerField
              id="dataGeneration"
              value={formValues.dataGeneration}
              onChange={handleChange}
              disabled={!editableFields.dataGeneration}
              multiline
              rows={4}
            />
            <IconWrapper>
              {editableFields.dataGeneration ? (
                <SaveIcon onClick={() => handleSaveField('dataGeneration')} />
              ) : (
                <EditIcon onClick={() => handleEditField('dataGeneration')} />
              )}
            </IconWrapper>
          </Question>

          <Question>
            <label htmlFor="dataPreprocessing">Data Preprocessing:</label>
          </Question>
          <Question>
            <AnswerField
              id="dataPreprocessing"
              value={formValues.dataPreprocessing}
              onChange={handleChange}
              disabled={!editableFields.dataPreprocessing}
              multiline
              rows={4}
            />
            <IconWrapper>
              {editableFields.dataPreprocessing ? (
                <SaveIcon onClick={() => handleSaveField('dataPreprocessing')} />
              ) : (
                <EditIcon onClick={() => handleEditField('dataPreprocessing')} />
              )}
            </IconWrapper>
          </Question>

          <Question>
            <label htmlFor="training">Training:</label>
          </Question>
          <Question>
            <AnswerField
              id="training"
              value={formValues.training}
              onChange={handleChange}
              disabled={!editableFields.training}
              multiline
              rows={4}
            />
            <IconWrapper>
              {editableFields.training ? (
                <SaveIcon onClick={() => handleSaveField('training')} />
              ) : (
                <EditIcon onClick={() => handleEditField('training')} />
              )}
            </IconWrapper>
          </Question>

          <Question>
            <label htmlFor="postProcessing">Post Processing:</label>
          </Question>
          <Question>
            <AnswerField
              id="postProcessing"
              value={formValues.postProcessing}
              onChange={handleChange}
              disabled={!editableFields.postProcessing}
              multiline
              rows={4}
            />
            <IconWrapper>
              {editableFields.postProcessing ? (
                <SaveIcon onClick={() => handleSaveField('postProcessing')} />
              ) : (
                <EditIcon onClick={() => handleEditField('postProcessing')} />
              )}
            </IconWrapper>
          </Question>

          <Question>
            <label htmlFor="deployment">Deployment:</label>
          </Question>
          <Question>
            <AnswerField
              id="deployment"
              value={formValues.deployment}
              onChange={handleChange}
              disabled={!editableFields.deployment}
              multiline
              rows={4}
            />
            <IconWrapper>
              {editableFields.deployment ? (
                <SaveIcon onClick={() => handleSaveField('deployment')} />
              ) : (
                <EditIcon onClick={() => handleEditField('deployment')} />
              )}
            </IconWrapper>
          </Question>

          <Question>
            <label htmlFor="concernedPart">Concerned Part:</label>
          </Question>
          <Question>
            <AnswerField
              id="concernedPart"
              value={formValues.concernedPart}
              onChange={handleChange}
              disabled={!editableFields.concernedPart}
              multiline
              rows={4}
            />
            <IconWrapper>
              {editableFields.concernedPart ? (
                <SaveIcon onClick={() => handleSaveField('concernedPart')} />
              ) : (
                <EditIcon onClick={() => handleEditField('concernedPart')} />
              )}
            </IconWrapper>
          </Question>

          <SubmitButton onClick={handleButtonClick}>Submit</SubmitButton>
        </form>
      </FormCard>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </NoSsr>
  );
};

export default FormComponent;
