import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Link from 'next/link';

const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
    text-align: center;

`;

const WelcomeMessage = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Dashboard = () => {
  return (
    <div>
      <CenteredContent>
        <WelcomeMessage>
          Welcome to Traceback-ai. Begin your Risk Classification.
        </WelcomeMessage>
        <Link href="../Risk_classification">
          <Button variant="contained" color="primary">
            Risk Classification
          </Button>
        </Link>
      </CenteredContent>
    </div>
  );
};

export default Dashboard;
