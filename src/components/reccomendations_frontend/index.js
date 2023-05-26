import React, { useEffect, useState } from 'react';
import { Card, CircularProgress } from '@material-ui/core';

function RecommendationCard({ recommendation, index }) {
  return (
    <div className="recommendation-item">
      <p>{`${index + 1}. ${recommendation}`}</p>
    </div>
  );
}

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const response = await fetch('API_ENDPOINT_URL');
        if (response.ok) {
          const data = await response.text();
          setRecommendations(data.split('%'));
        } else {
          console.error('Failed to fetch recommendations');
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  return (
    <div className="recommendations-container">
      {loading ? (
        <CircularProgress className="loading-icon" />
      ) : (
        <Card className="recommendations">
          {recommendations.length > 0 ? (
            <div className="recommendations-scroll">
              {recommendations.map((recommendation, index) => (
                <RecommendationCard key={index} recommendation={recommendation} index={index} />
              ))}
            </div>
          ) : (
            <p>No recommendations for now. Update the F.I.R document.</p>
          )}
        </Card>
      )}
    </div>
  );
}

export default Recommendations;
