import React, { useState } from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import NoSsr from '@mui/material/NoSsr';

import FormComponent from '../../components/FIR_Form_Component';
import Recommendations from '../../components/reccomendations_frontend';
import SavedRecommendations from '../../components/saved_reccomendation';
import Code_Summary from '../../components/code_summary'

import { Tab, Tabs, Typography } from '@mui/material';
import Box from '@mui/material/Box';

const NavigationBar = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  @media (max-width: 600px) {
    justify-content: space-between;
  }
`;

const WideDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 90%;
    max-width: 900px;
  }
`;

const WideDialogContent = styled(DialogContent)`
  padding: 2rem;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const NavLinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Button)`
  margin-right: 1rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #ffffff;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const DropdownMenu = styled.div`
  position: relative;
`;

const MenuButton = styled(Button)`
  display: none;

  @media (max-width: 600px) {
    display: block;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 0.5rem;

  ${DropdownMenu}:hover & {
    display: block;
  }
`;

const DropdownNavLink = styled(Button)`
  display: block;
  width: 100%;
  padding: 0.5rem;
  text-align: left;
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
  border-radius: 10px;
`;

const DashboardCard = styled.div`
  flex-basis: 25%;
  min-width: 300px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: calc(80vh - 1rem);
  transition: transform 0.2s ease-in-out;
  border-radius: 10px;

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
  height: calc(80vh - 1rem);
  transition: transform 0.5s ease-in-out;
  border-radius: 10px;

  &:hover {
    transform: scale(1.02);
  }
`;

const FirstInfoButton = styled(Button)`
  background-color: #f89ef5 !important;
  color: #ad63f3 !important;
  font-size: 1.1rem;
`;

const RecommendationItem = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  border-radius: 10px;

  &:hover {
    transform: scale(1.015);
  }
`;

const Dashboard = () => {
  const [isFIRDialogOpen, setFIRDialogOpen] = useState(false);
  const [tab, setTab] = useState('1');
  const [showRecommendations, setShowRecommendations] = useState(true);

  const handleFIRDialogOpen = () => {
    setFIRDialogOpen(true);
  };

  const handleFIRDialogClose = () => {
    setFIRDialogOpen(false);
  };

  const handleTabChange = (_, newTab) => {
    setTab(newTab);
  };

  const handleToggleRecommendations = () => {
    setShowRecommendations(!showRecommendations);
  };

  return (
    <NoSsr>
      <>
        <NavigationBar>
          <NavLinkContainer>
            <NavLink variant='text' onClick={() => (window.location.href = '../act_viewer_hardcoded')}>
              Eu-ai-act-viewer
            </NavLink>
            <NavLink variant='text' onClick={() => (window.location.href = '../chat_box_page')}>
              AI-act gpt
            </NavLink>
            <NavLink variant='text' onClick={() => (window.location.href = '../flow_chart')}>
              Flow Chart
            </NavLink>
            <NavLink variant='text' onClick={() => (window.location.href = '../check_list')}>
              Checklist
            </NavLink>
          </NavLinkContainer>
          <DropdownMenu>
            <MenuButton>
              <MenuIcon />
            </MenuButton>
            <DropdownContent>
              <DropdownNavLink onClick={() => (window.location.href = '../act_viewer_hardcoded')}>
                Eu-ai-act-viewer
              </DropdownNavLink>
              <DropdownNavLink onClick={() => (window.location.href = '../chat_box_page')}>AI-act gpt</DropdownNavLink>
              <DropdownNavLink onClick={() => (window.location.href = '../flow_chart')}>Flow Chart</DropdownNavLink>
              <DropdownNavLink onClick={() => (window.location.href = '../check_list')}>Checklist</DropdownNavLink>
              <DropdownNavLink onClick={handleFIRDialogOpen}>F.I.R</DropdownNavLink>
            </DropdownContent>
          </DropdownMenu>
          <NavLink variant='text'  onClick={handleFIRDialogOpen}>
            <FirstInfoButton variant='contained' color="primary">F.I.R</FirstInfoButton>
          </NavLink>
        </NavigationBar>

        <MainSection>
          <DashboardCard >
            <h2>Project Dashboard</h2>
            <p>Graphs and statistics</p>
          </DashboardCard>

          <RecommendationCard>
            <Tabs value={tab} onChange={handleTabChange}>
              <Tab label='Recommendations' value='1' />
              <Tab label='Saved Recommendations' value='2' />
              <Tab label='Code Summary' value='3' />


            </Tabs>
            <Box sx={{ p: 3 }}>
              {tab === '1' && (
                <>
                  <Recommendations />
                </>
              )}
              {tab === '2' && (
                <>
                  <SavedRecommendations />
                </>
              )}
              {tab === '3' && (
                <>
                  <Code_Summary />
                </>
              )}

            </Box>
          </RecommendationCard>
        </MainSection>

        <WideDialog open={isFIRDialogOpen} onClose={handleFIRDialogClose}>
          <DialogTitle>F.I.R Form</DialogTitle>
          <WideDialogContent>
            <FormComponent />
          </WideDialogContent>
          <DialogActions>
            <Button onClick={handleFIRDialogClose} color='primary'>
              Close
            </Button>
          </DialogActions>
        </WideDialog>
      </>
    </NoSsr>
  );
};

export default Dashboard;
