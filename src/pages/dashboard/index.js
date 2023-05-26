import React, { useState } from 'react'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import NoSsr from '@mui/material/NoSsr'

import FormComponent from '../../components/FIR_Form_Component' // Import the FormComponent
import Recommendations from '../../components/reccomendations_frontend' // Import the Recommendations component

const NavigationBar = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  @media (max-width: 600px) {
    justify-content: space-between;
  }
`

const NavLinkContainer = styled.div`
  display: flex;
  align-items: center;
`

const NavLink = styled(Button)`
  margin-right: 1rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #e0e0e0;
  }

  @media (max-width: 600px) {
    display: none;
  }
`

const DropdownMenu = styled.div`
  position: relative;
`

const MenuButton = styled(Button)`
  display: none;

  @media (max-width: 600px) {
    display: block;
  }
`

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
`

const DropdownNavLink = styled(Button)`
  display: block;
  width: 100%;
  padding: 0.5rem;
  text-align: left;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #e0e0e0;
  }
`

const MainSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 10px;
`

const DashboardCard = styled.div`
  flex-basis: 25%;
  min-width: 300px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: calc(70vh - 2rem);
  transition: transform 0.2s ease-in-out;
  border-radius: 10px;

  &:hover {
    transform: scale(1.02);
  }
`

const RecommendationCard = styled.div`
  flex-basis: calc(75% - 1rem);
  min-width: 300px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: calc(70vh - 2rem);
  border-radius: 10px;
`

const FirstInfoButton = styled(Button)`
  background-color: #d61e1e !important;
  color: #fff !important;
  font-size: 1.1rem;
`

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
`

const Dashboard = () => {
  const [isFIRDialogOpen, setFIRDialogOpen] = useState(false)

  const handleFIRDialogOpen = () => {
    setFIRDialogOpen(true)
  }

  const handleFIRDialogClose = () => {
    setFIRDialogOpen(false)
  }

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
          <NavLink variant='text' onClick={handleFIRDialogOpen}>
            <FirstInfoButton variant='contained'>F.I.R</FirstInfoButton>
          </NavLink>
        </NavigationBar>

        <MainSection>
          <DashboardCard>
            <h2>Project Dashboard</h2>
            <p>Graphs and statistics</p>
          </DashboardCard>

          <RecommendationCard>
            <h2>Recommendations</h2>
            <Recommendations />
          </RecommendationCard>
        </MainSection>

        <Dialog open={isFIRDialogOpen} onClose={handleFIRDialogClose}>
          <DialogTitle>F.I.R Form</DialogTitle>
          <DialogContent>
            <FormComponent />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFIRDialogClose} color='primary'>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </NoSsr>
  )
}

export default Dashboard
