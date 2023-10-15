import React from 'react';
import styled from 'styled-components';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from '@mui/material';
import Link from 'next/link';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const RecommendationsPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 80%;
  max-width: 800px;
  padding: 1rem;
  text-align: center;
`;

const ExpandIcon = styled.div`
  display: inline-block;
  transform: rotate(0deg); /* Initial state: not expanded */
  transition: transform 0.2s;
`;

const RecommendationCard = ({ title, content }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandIcon>{expanded ? '▼' : '►'}</ExpandIcon>}
        onClick={handleExpand}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const Recommendations = () => {
  return (
    <PageContainer>
      <RecommendationsPage>
        <RecommendationCard
          title="Data Collection and Preprocessing"
          content="Details of Recommendation 1."
        />
        <RecommendationCard
          title="Model Selection and Training"
          content="Details of Recommendation 2."
        />
        <RecommendationCard
          title="Model Validation"
          content="Details of Recommendation 1."
        />
        <RecommendationCard
          title="Model Deployment and Maintenance"
          content="Details of Recommendation 1."
        />
        {/* Add more RecommendationCard components as needed */}

        <Link href="../dashboard">
        <Button
          variant="contained"
          color="primary"
          
        >
          Start Over
        </Button>
        </Link>
      </RecommendationsPage>
    </PageContainer>
  );
};

export default Recommendations;
