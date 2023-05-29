import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
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

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('/api/xyz'); // Replace with the actual API endpoint
        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        console.error('An error occurred while fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <RecommendationCard>
      <h2>Saved Recommendations</h2>
      {recommendations.map((recommendation, index) => (
        <Card key={index} style={{ marginBottom: '1rem', padding: '1rem' }}>
          <pre>{JSON.stringify(recommendation, null, 2)}</pre>
        </Card>
      ))}
    </RecommendationCard>
  );
};

export default SavedRecommendations;
