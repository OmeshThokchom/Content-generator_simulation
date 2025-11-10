import React from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';

interface ProgressStepperProps {
  activeStep: number;
}

const steps = [
  'Provide Inputs',
  'Processing Data',
  'Review Script',
  'Generating Video',
  'Video Ready',
];

const ProgressStepper: React.FC<ProgressStepperProps> = ({ activeStep }) => {
  return (
    <Box sx={{ width: '100%', my: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProgressStepper;
