import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import InputForm from '../components/InputForm';
import ProcessingView from '../components/ProcessingView';
import ScriptEditor from '../components/ScriptEditor';
import VideoGenerationView from '../components/VideoGenerationView';
import FinalVideoView from '../components/FinalVideoView';

type AppState = 'input' | 'processing' | 'script' | 'generating' | 'done';

const HomePage = () => {
  const [appState, setAppState] = useState<AppState>('input');
  const [formData, setFormData] = useState(null);

  const handleGenerate = (data: any) => {
    setFormData(data);
    setAppState('processing');
  };

  const handleProcessingComplete = () => {
    setAppState('script');
  };

  const handleScriptApprove = () => {
    setAppState('generating');
  };

  const handleGenerationComplete = () => {
    setAppState('done');
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
      {appState === 'input' && (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            AI Video Generation Simulation
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Provide inputs to generate a marketing video or a social media reel.
          </Typography>
          <InputForm onSubmit={handleGenerate} />
        </>
      )}

      {appState === 'processing' && (
        <ProcessingView onComplete={handleProcessingComplete} />
      )}

      {appState === 'script' && <ScriptEditor onApprove={handleScriptApprove} />}

      {appState === 'generating' && (
        <VideoGenerationView onComplete={handleGenerationComplete} />
      )}

      {appState === 'done' && <FinalVideoView />}
    </Container>
  );
};

export default HomePage;