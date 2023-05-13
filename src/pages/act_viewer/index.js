import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Button, Container } from '@material-ui/core';

const Test = () => {
  const [tests, setTests] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleGet = async (tag) => {
    try {
      const response = await axios.get(`../api/eu-ai-act-data?tags=${tag}`);
      setTests(response.data.filter(test => test.tags.includes(tag)));
      setSelectedTag(tag);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSelectedTag(null); // reset selectedTag when component mounts
    
    const fetchData = async () => {
      try {
        const response = await axios.get('../api/eu-ai-act-data');
        setTests(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={1.5}>
          <Button variant="contained" color="primary" onClick={() => handleGet('Design')}>
            1.Design(Problem Definition)
          </Button>
        </Grid>
        <Grid item xs={1.5}>
          <Button variant="contained" color="primary" onClick={() => handleGet('Development')}>
            2.Developement(Prepare and train)
          </Button>
        </Grid>
        <Grid item xs={1.5}>
          <Button variant="contained" color="primary" onClick={() => handleGet('Model-Evaluation')}>
            3.Model-Evaluation(Test and deploy)
          </Button>
        </Grid>
        <Grid item xs={1.5}>
          <Button variant="contained" color="primary" onClick={() => handleGet('Operation')}>
             4.Operation(Sustain and Maintain)
          </Button>
        </Grid>
        <Grid item xs={1.5}>
          <Button variant="contained" color="primary" onClick={() => handleGet('Retirement')}>
            5.Retirement(Deactivate)
          </Button>
        </Grid>
      </Grid>
      <Card>
        <div style={{ display: 'flex', flexWrap: 'wrap', maxHeight: '75vh', overflowY: 'scroll' }}>
          {selectedTag ? (
            tests.length > 0 ? (
              tests.map((test) => (
                <Card key={test._id} style={{ margin: '16px', maxHeight: '70vh' }}>
                  <CardContent>
                    <Typography variant="h5">{test.title}</Typography>
                    <Typography variant="body1">{test.description}</Typography>
                    <Typography variant="body2">Tags: {test.tags}</Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography>No documents found for {selectedTag} tag.</Typography>
            )
          ) : (
            <Typography>Click a tag to show documents.</Typography>
          )}
        </div>
      </Card>
    </Container>
  );
};

export default Test;
