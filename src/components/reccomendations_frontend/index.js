import React, { useState } from 'react';
import { Card, CircularProgress, Button, IconButton, Snackbar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

function RecommendationCard({ recommendation, onSave }) {
  const handleSave = () => {
    onSave(recommendation);
  };

  return (
    <Card className="recommendation-card">
      {recommendation.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}
      <IconButton onClick={handleSave} className="save-icon-button">
        <SaveIcon />
      </IconButton>
    </Card>
  );
}

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);

      const response = await fetch(process.env.RECC_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.answer.split('\n'));
      } else {
        console.error('Failed to fetch recommendations');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchRecommendations();
  };

  const handleSaveRecommendation = (recommendation) => {
    // Code for saving recommendation to Google Cloud Storage

    // Show success message
    setSaveSuccess(true);
  };

  const handleSnackbarClose = () => {
    setSaveSuccess(false);
  };

  return (
    <div className="recommendations-container">
      <Button variant="contained" color="primary" onClick={handleRefresh}>
        Refresh
      </Button>
      {loading ? (
        <CircularProgress className="loading-icon" />
      ) : (
        <div className="recommendations">
          {recommendations.length > 0 ? (
            recommendations.map((recommendation, index) => (
              <RecommendationCard
                key={index}
                recommendation={recommendation}
                onSave={handleSaveRecommendation}
              />
            ))
          ) : (
            <p>No recommendations for now. Update the F.I.R document and click Refresh.</p>
          )}
        </div>
      )}
      <Snackbar
        open={saveSuccess}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="Recommendation saved successfully"
      />
    </div>
  );
}

export default Recommendations;
