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

const RiskClassificationPage = styled.div`
  width: 80%;
  max-width: 500px;
  padding: 1rem;
  text-align: center;
`;

const QuestionCard = styled(Card)`
  margin-bottom: 1rem;
  text-align: center; // Center align the questions
`;

const SubmitButton = styled(Button)`
  margin-top: 1rem;
`;

const RiskClassification = () => {
  const [answers, setAnswers] = useState(Array(10).fill('')); // Initialize with 10 empty strings

  const questions = [
    {
      question: 'Question 1: What is your answer for question 1?',
      options: ['Option A', 'Option B', 'Option C'],
    },
    {
      question: 'Question 2: What is your answer for question 2?',
      options: ['Option X', 'Option Y', 'Option Z'],
    },
    // Add more questions and options as needed
  ];

  const getRandomPage = () => {
    const pages = ['Unacceptable_Risk', 'High_Risk', 'Low_Risk'];
    const randomIndex = Math.floor(Math.random() * pages.length);
    return pages[randomIndex];
  };

  const handleAnswerChange = (event, questionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = event.target.value;
    setAnswers(updatedAnswers);
  };

  return (
    <PageContainer>
      <RiskClassificationPage>
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

        <Link href={`../${getRandomPage()}`}>
          <SubmitButton
            variant="contained"
            color="primary"
          >
            Submit
          </SubmitButton>
        </Link>
      </RiskClassificationPage>
    </PageContainer>
  );
};

export default RiskClassification;
