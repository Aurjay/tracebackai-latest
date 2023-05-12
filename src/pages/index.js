// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import React from "react"
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../utils/firebase"
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react';

const Home = () => {
  const [user,loading] = useAuthState(auth)
  const router = useRouter()
  if (loading){
    return <div> Loading ...</div>
  }
  if(user){
    router.push("/dashboard")
  }
  
  return (
    <ApexChartWrapper>
    <Card>
    <Analytics />

      <Button container spacing={6}>
        <h1>Dashboard</h1>
      </Button></Card>
    </ApexChartWrapper>

  )
}

export default Home
