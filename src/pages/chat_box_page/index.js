// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import React from "react"
import { Analytics } from '@vercel/analytics/react';
import useFetchData from '../../components/database/getdatacomp'
import ChatboxFrontend from 'src/components/chatbox_frontend';




const Chat_box_page = () => {
  const { data, loading } = useFetchData()
  console.log("datalogged:", data)

  return (
    <ApexChartWrapper>
      <Button sx={{p:"0.01%",mx:"5%"}} variant="outlined" onClick={event =>  window.location.href="../dashboard"}>
        <h1>Main Dashboard</h1>
      </Button>

      <Card sx={{
        height: 750,
        width: "90%",
        display: 'inline-block',
        p: "5%",
        mx: "5%",
        textAlign: 'center'
      }}>
        <ChatboxFrontend/>
      </Card>



    </ApexChartWrapper>



  )
}

export default Chat_box_page