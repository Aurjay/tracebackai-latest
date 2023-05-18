// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import graphAvatar from '../../../public/images/avatars/graph.png';

const Dashboard = () => {


  const cardStyle = {
    height: 180,
    width: '40%',
    display: 'inline-block',
    p: '5%',
    mx: '5%',
    textAlign: 'center',
    backgroundImage: 'url(${graphAvatar})',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <ApexChartWrapper>
      <Card sx={cardStyle}>
        <Button container spacing={2} variant="contained" onClick={event => window.location.href = "../act_viewer_hardcoded"}>
          <h1>Eu-ai-act-viewer</h1>
          <Analytics />
        </Button>
      </Card>

      <Card sx={{ ...cardStyle, backgroundImage: 'none' }}>
        <Button container spacing={2} variant="contained" onClick={event => window.location.href = "../chat_box_page"}>
          <h1>AI-act gpt</h1>
          <Analytics />
        </Button>
      </Card>

      <Card sx={{ ...cardStyle, backgroundImage: 'none' }}>
        <Button container spacing={2} variant="contained" onClick={event => window.location.href = "../flow_chart"}>
          <h1>Flow Chart</h1>
          <Analytics />
        </Button>
      </Card>

      <Card sx={{ ...cardStyle, backgroundImage: 'none' }}>
        <Button container spacing={2} variant="contained" onClick={event => window.location.href = "../check_list"}>
          <h1>Checklist</h1>
          <Analytics />
        </Button>
      </Card>
    </ApexChartWrapper>
  );
};

export default Dashboard;
