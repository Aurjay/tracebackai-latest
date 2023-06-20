import React, { useState, useEffect } from 'react';
import { Card, Button, styled } from '@mui/material';

const RecommendationCard = styled(Card)`
  flex-basis: calc(75% - 4rem);
  min-width: 600px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f5f5f5; /* Light grey background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
  transition: transform 0.9s ease-in-out;
  border-radius: 10px;
  overflow-y: auto;
`;

const FetchDataCard = ({ handleRefresh, refreshing, recommendationData }) => {
  return (
    <RecommendationCard variant="outlined">
      <div>
        <Button variant="contained" color="primary" onClick={handleRefresh}>
          Refresh
        </Button>
        {refreshing ? (
          <div>
            <Button variant="contained" color="primary" disabled>
              Refreshing...
            </Button>
            <span className="loading-icon"> {/* Add your loading icon component here */}</span>
          </div>
        ) : recommendationData ? (
          <div>
            <h2>Recommendation Summary</h2>
            <pre>{JSON.stringify(recommendationData, null, 2)}</pre>
          </div>
        ) : null}
      </div>
    </RecommendationCard>
  );
};

const Code_Summary_Refresh = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [recommendationData, setRecommendationData] = useState(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('https://example.com/api/recommendations'); // Replace with your actual URL
      if (response.ok) {
        const data = await response.json();
        setRecommendationData(data);
      } else {
        console.error('Failed to fetch recommendations');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    handleRefresh(); // Fetch data on initial load
  }, []);

  return (
    <div>
      <FetchDataCard
        handleRefresh={handleRefresh}
        refreshing={refreshing}
        recommendationData={recommendationData}
      />
    </div>
  );
};

export default Code_Summary_Refresh;
