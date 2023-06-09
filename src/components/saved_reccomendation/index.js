import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const RecommendationCard = styled(Card)`
  flex-basis: calc(75% - 2rem);
  min-width: 300px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: calc(70vh - 10rem);
  transition: transform 0.5s ease-in-out;
  border-radius: 10px;
  overflow-y: auto;
`;

const RecommendationItem = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem;
`;

const SavedRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [deletedRecommendationNames, setDeletedRecommendationNames] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []); // Fetch recommendations on initial component load

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/Recc-data-receive'); // Replace with the actual API endpoint
      const data = await response.json();
      console.log('Fetched recommendations:', data); // Debugging statement

      // Extract the recommendations from the received JSON data
      const recommendations = Object.entries(data).map(([docName, item]) => ({
        docName,
        data: item.data,
      }));

      if (recommendations.length > 0) {
        setRecommendations(recommendations);
        setShowSaveButton(false); // Reset save button visibility
      } else {
        setRecommendations([]);
        setShowSaveButton(false); // Reset save button visibility
      }
    } catch (error) {
      console.error('An error occurred while fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchRecommendations();
  };

  const handleDelete = async (docName) => {
    try {
      setLoading(true);

      // Assuming you have an API endpoint to delete the recommendation by document name
      await fetch(`/api/delete-recommendation/${docName}`, { method: 'DELETE' });

      // Update the deleted recommendation names
      setDeletedRecommendationNames([...deletedRecommendationNames, docName]);

      const updatedRecommendations = recommendations.filter((rec) => rec.docName !== docName);
      setRecommendations(updatedRecommendations);
      setShowSaveButton(true); // Show save button after deleting a recommendation
    } catch (error) {
      console.error('An error occurred while deleting recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Get the non-deleted recommendations
      const nonDeletedRecommendations = recommendations.filter(
        (rec) => !deletedRecommendationNames.includes(rec.docName)
      );

      // Log the data being sent to the API endpoint
      console.log('Data to be sent:', nonDeletedRecommendations);

      // Assuming you have an API endpoint to save the updated recommendations
      await fetch('/api/save-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recommendations: nonDeletedRecommendations }),
      });

      setShowSaveButton(false); // Hide save button after saving
    } catch (error) {
      console.error('An error occurred while saving recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RecommendationCard>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Button variant="contained" color="primary" onClick={handleRefresh}>
          Refresh
        </Button>
        {showSaveButton && (
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
            Save
          </Button>
        )}
      </div>
      {loading ? (
        <CircularProgress style={{ margin: 'auto' }} />
      ) : (
        <>
          {recommendations.length > 0 ? (
            recommendations.map((recommendation) => (
              <RecommendationItem key={recommendation.docName}>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{recommendation.data}</pre>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(recommendation.docName)}
                >
                  Delete
                </Button>
              </RecommendationItem>
            ))
          ) : (
            <p>No recommendations available.</p>
          )}
        </>
      )}
    </RecommendationCard>
  );
};

export default SavedRecommendations;
