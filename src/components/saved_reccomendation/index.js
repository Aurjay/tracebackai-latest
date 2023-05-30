import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

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
`;

const SavedRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/Recc-data-receive'); // Replace with the actual API endpoint
      const data = await response.json();
      console.log('Fetched recommendations:', data); // Debugging statement
      if (Array.isArray(data.recommendations)) {
        const filteredRecommendations = data.recommendations.filter((rec) => rec !== null);
        setRecommendations(filteredRecommendations);
      } else {
        setRecommendations([]);
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

  return (
    <RecommendationCard>
      <h2>Saved Recommendations</h2>
      {loading ? (
        <CircularProgress style={{ margin: 'auto' }} />
      ) : (
        <>
          {recommendations.length > 0 ? (
            recommendations.map((recommendation, index) => (
              <Card key={index} style={{ marginBottom: '1rem', padding: '1rem' }}>
                <pre>{recommendation}</pre>
              </Card>
            ))
          ) : (
            <p>No recommendations available.</p>
          )}
        </>
      )}
      <Button variant="contained" color="primary" onClick={handleRefresh}>
        Refresh
      </Button>
    </RecommendationCard>
  );
};

export default SavedRecommendations;
