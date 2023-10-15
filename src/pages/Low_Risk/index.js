import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Link from 'next/link';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const HighRiskPage = styled.div`
  width: 80%;
  max-width: 500px;
  padding: 1rem;
  text-align: center;
`;

const QuestionCard = styled(Card)`
  margin-bottom: 1rem;
  text-align: center;
`;

const SubmitButton = styled(Button)`
  margin-top: 1rem;
`;

const GenerateRecommendationsButton = styled(Button)`
  margin-top: 1rem;
`;

const HighRisk = () => {
  const [answers, setAnswers] = useState(Array(5).fill('')); // Initialize with 5 empty strings

  const questions = [
    {
      question: 'High Risk Project Details 1',
      options: ['Option A', 'Option B', 'Option C'],
    },
    {
      question: 'High Risk Project Details 2',
      options: ['Option X', 'Option Y', 'Option Z'],
    },
    // Add more high-risk project Details and options as needed
  ];

  const handleAnswerChange = (event, questionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = event.target.value;
    setAnswers(updatedAnswers);
  };

  return (
    <PageContainer>
      <HighRiskPage>
        {questions.map((questionData, index) => (
          <QuestionCard key={index}>
            <CardContent>
              <Typography variant="h6">{questionData.question}</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label={`question-${index}`}
                  name={`question-${index}`}
                  value={answers[index]}
                  onChange={(event) => handleAnswerChange(event, index)}
                >
                  {questionData.options.map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
          </QuestionCard>
        ))}

<Link href={`../Recommendations`}>
          <GenerateRecommendationsButton
            variant="contained"
            color="primary"
          >
            Generate Recommendations
          </GenerateRecommendationsButton>
        </Link>
      </HighRiskPage>
    </PageContainer>
  );
};

export default HighRisk;
