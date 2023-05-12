// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import React from "react"
import { Analytics } from '@vercel/analytics/react';
import useFetchData from '../../components/database/getdatacomp'
import ChatboxFrontend from 'src/components/chatbox_frontend';



const Dashboard = () => {
  const { data, loading } = useFetchData()
  console.log("datalogged:", data)

  return (
    <ApexChartWrapper>
      
      <Card sx={{
        height: 400,
        width: "40%",
        display: 'inline-block',
        p: "5%",
        mx: "5%",
        textAlign: 'center'
      }} >
        <Button container spacing={2} variant="contained" >

          <h1>Eu-ai-act-viewer</h1>
          <Analytics />          
        </Button>
      </Card>

      

      <Card sx={{
        height: 400,
        width: "40%",
        display: 'inline-block',
        p: "5%",
        mx: "5%",
        textAlign: 'center'
      }}>
        <Button container spacing={2} variant="contained" onClick={event =>  window.location.href="../chat_box_page"}
 >

          <h1>AI-act gpt</h1>
          <Analytics />
        </Button></Card>


      <Card sx={{
        height: 400,
        width: "40%",
        display: 'inline-block',
        p: "5%",
        mx: "5%",
        textAlign: 'center'
      }}>
        <Button container spacing={2} variant="contained">

          <h1>Flow Chart</h1>
          <Analytics />
        </Button></Card>

      <Card sx={{
        height: 400,
        width: "40%",
        display: 'inline-block',
        p: "5%",
        mx: "5%",
        textAlign: 'center'
      }}>
        <Button container spacing={2} variant="contained">

          <h1>Checklist</h1>
          <Analytics />
        </Button></Card>
    </ApexChartWrapper>



  )
}

export default Dashboard