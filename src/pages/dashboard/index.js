// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import React from "react"
import { Analytics } from '@vercel/analytics/react';
import useFetchData from '../../components/database/getdatacomp'



const Dashboard = () => {
  const { data, loading } = useFetchData()
  console.log("datalogged:",data)
    
  return (
    <ApexChartWrapper>
    <Card>
      <Button container spacing={6}>
        <h1>Dashboard</h1>
        <Analytics />
      </Button></Card>
    </ApexChartWrapper>
    

  )
}

export default Dashboard