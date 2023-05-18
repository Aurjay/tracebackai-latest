import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import graphAvatar from '../../../public/images/avatars/graph.png';

const DashboardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
`;

const CardWrapper = styled(Card)`
  height: 180px;
  width: calc(40% - 2rem);
  margin: 1rem;
  text-align: center;
  background-image: url(${graphAvatar});
  background-size: cover;
  background-position: center;
  background-color: #fff; /* Set a background color */
  border-radius: 10px; /* Add border radius */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add box shadow */
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ButtonStyled = styled(Button)`
  width: 100%;
`;

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <CardWrapper>
        <ButtonStyled container spacing={2} variant="contained" onClick={() => window.location.href = "../act_viewer_hardcoded"}>
          <h1>Eu-ai-act-viewer</h1>
          <Analytics />
        </ButtonStyled>
      </CardWrapper>

      <CardWrapper>
        <ButtonStyled container spacing={2} variant="contained" onClick={() => window.location.href = "../chat_box_page"}>
          <h1>AI-act gpt</h1>
          <Analytics />
        </ButtonStyled>
      </CardWrapper>

      <CardWrapper>
        <ButtonStyled container spacing={2} variant="contained" onClick={() => window.location.href = "../flow_chart"}>
          <h1>Flow Chart</h1>
          <Analytics />
        </ButtonStyled>
      </CardWrapper>

      <CardWrapper>
        <ButtonStyled container spacing={2} variant="contained" onClick={() => window.location.href = "../check_list"}>
          <h1>Checklist</h1>
          <Analytics />
        </ButtonStyled>
      </CardWrapper>
    </DashboardWrapper>
  );
};

export default Dashboard;
