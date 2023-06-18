import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const RecommendationCard = styled(Card)`
  flex-basis: calc(75% - 4rem);
  min-width: 600px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f5f5f5; /* Light grey background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: calc(55vh - 10rem);
  transition: transform 0.9s ease-in-out;
  border-radius: 10px;
  overflow-y: auto;
`;

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [fileSent, setFileSent] = useState(false);
  const [recommendationData, setRecommendationData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        const url = `https://www.googleapis.com/upload/storage/v1/b/test-json-latest/o?uploadType=media&name=${encodeURIComponent(
          selectedFile.name
        )}`;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          body: selectedFile,
        });

        if (response.ok) {
          console.log('File uploaded successfully!');
          setFileSent(true);
        } else {
          throw new Error('File upload failed');
        }
      } catch (error) {
        setUploadError(error.message);
      }
    }
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('process.env.CODE_SUMM_URL');
        if (response.ok) {
          const data = await response.json();
          setRecommendationData(data);
        } else {
          console.error('Failed to fetch recommendations');
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    if (fileSent) {
      fetchRecommendations();
    }
  }, [fileSent]);

  return (
    <div>
      <input type="file" accept=".py" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleFileUpload}>
        Upload File
      </Button>
      {uploadError && <p>Error: {uploadError}</p>}
      {fileSent && <p>File sent successfully. Refresh to get the Summary.</p>}
      {recommendationData && (
        <RecommendationCard variant="outlined">
          <h2>Recommendation Summary</h2>
          <pre>{JSON.stringify(recommendationData, null, 2)}</pre>
        </RecommendationCard>
      )}
    </div>
  );
};

const RecommendationSummary = () => {
  return (
    <div>
      <RecommendationCard variant="outlined">
        <FileUploadForm />
      </RecommendationCard>
    </div>
  );
};

const PageContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align cards to the top */
  height: 100vh;
`;

const RecommendationSummaryPage = () => {
  return (
    <PageContainer>
      <RecommendationSummary />
    </PageContainer>
  );
};

export default RecommendationSummaryPage;
