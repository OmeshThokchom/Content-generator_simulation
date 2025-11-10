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

const generationSteps = [
  'Generating video clips...',
  'Generating voice-over...',
  'Generating background music...',
  'Mixing audio tracks...',
  'Adding subtitles and branding...',
  'Rendering final video...',
];

interface VideoGenerationViewProps {
  onComplete: () => void;
}

const VideoGenerationView: React.FC<VideoGenerationViewProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [statuses, setStatuses] = useState(
    new Array(generationSteps.length).fill('pending')
  );

  useEffect(() => {
    if (currentStep >= generationSteps.length) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setStatuses((prevStatuses) => {
        const newStatuses = [...prevStatuses];
        if (currentStep < generationSteps.length) {
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
    if (index === currentStep) {
      return <CircularProgress size={24} />;
    }
    return <Chip label="Pending" size="small" />;
  };

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Generating Your Video...
      </Typography>
      <List>
        {generationSteps.map((step, index) => (
          <ListItem key={index}>
            <ListItemIcon>{getStatusIcon(statuses[index], index)}</ListItemIcon>
            <ListItemText primary={step} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default VideoGenerationView;
