import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const processingSteps = [
  'Validating inputs...',
  'Scraping product data from URL...',
  'Analyzing text content...',
  'Determining content type...',
  'Generating script with AI...',
];

interface ProcessingViewProps {
  onComplete: () => void;
}

const ProcessingView: React.FC<ProcessingViewProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [statuses, setStatuses] = useState(
    new Array(processingSteps.length).fill('pending')
  );

  useEffect(() => {
    if (currentStep >= processingSteps.length) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setStatuses((prevStatuses) => {
        const newStatuses = [...prevStatuses];
        if (currentStep < processingSteps.length) {
          newStatuses[currentStep] = 'completed';
          if (currentStep > 0) {
            newStatuses[currentStep - 1] = 'completed';
          }
        }
        return newStatuses;
      });
      setCurrentStep((prevStep) => prevStep + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, [currentStep, onComplete]);

  const getStatusIcon = (status: string, index: number) => {
    if (status === 'completed') {
      return <CheckCircleIcon color="success" />;
    }
    if (status === 'error') {
      return <ErrorIcon color="error" />;
    }
    if (index === currentStep) {
      return <CircularProgress size={24} />;
    }
    return <Chip label="Pending" size="small" />;
  };

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Processing Video Request...
      </Typography>
      <List>
        {processingSteps.map((step, index) => (
          <ListItem key={index}>
            <ListItemIcon>{getStatusIcon(statuses[index], index)}</ListItemIcon>
            <ListItemText primary={step} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProcessingView;
