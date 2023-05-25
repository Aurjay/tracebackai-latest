import Button from '@mui/material/Button';
import styled from 'styled-components';
import React from 'react';
import { Analytics } from '@vercel/analytics/react';

const NavigationBar = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavLink = styled(Button)`
  margin-right: 1rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const MainSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
`;

const DashboardCard = styled.div`
  flex-basis: 25%;
  min-width: 300px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: calc(70vh - 2rem);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const RecommendationCard = styled.div`
  flex-basis: calc(75% - 1rem);
  min-width: 300px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: calc(70vh - 2rem);

`;

const FirstInfoButton = styled(Button)`
  background-color: #d61e1e !important;
  color: #fff !important;
  font-size: 1.1rem;

`;

const RecommendationItem = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.015);
  }
`;

const Dashboard = () => {
  return (
    <>
      <NavigationBar>
        <NavLink variant="text" onClick={() => window.location.href = "../act_viewer_hardcoded"}>
          Eu-ai-act-viewer
        </NavLink>
        <NavLink variant="text" onClick={() => window.location.href = "../chat_box_page"}>
          AI-act gpt
        </NavLink>
        <NavLink variant="text" onClick={() => window.location.href = "../flow_chart"}>
          Flow Chart
        </NavLink>
        <NavLink variant="text" onClick={() => window.location.href = "../check_list"}>
          Checklist
        </NavLink>
        <NavLink variant="text" onClick={() => window.location.href = "../first_information"}>
          <FirstInfoButton variant="contained">F.I.R</FirstInfoButton>
        </NavLink>
      </NavigationBar>

      <MainSection>
        <DashboardCard>
          <h2>Project Dashboard</h2>
          <p>Graphs and statistics</p>
        </DashboardCard>

        <RecommendationCard>
          <h2>Recommendations</h2>
          <div>
            <RecommendationItem>
              <h3>Recommendation 1</h3>
              <p>Some details about Recommendation 1</p>
            </RecommendationItem>

            <RecommendationItem>
              <h3>Recommendation 2</h3>
              <p>Some details about Recommendation 2</p>
            </RecommendationItem>

            <RecommendationItem>
              <h3>Recommendation 3</h3>
              <p>Some details about Recommendation 3</p>
            </RecommendationItem>

            <RecommendationItem>
              <h3>Recommendation 4</h3>
              <p>Some details about Recommendation 4</p>
            </RecommendationItem>

            {/* Add more recommendation items as necessary */}
          </div>
        </RecommendationCard>
      </MainSection>
    </>
  );
};

export default Dashboard;
