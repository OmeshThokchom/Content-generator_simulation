import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import InputForm from '../components/InputForm';
import ProcessingView from '../components/ProcessingView';
import ScriptEditor from '../components/ScriptEditor';
import VideoGenerationView from '../components/VideoGenerationView';
import FinalVideoView from '../components/FinalVideoView';
import ProgressStepper from '../components/ProgressStepper';

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

  const getActiveStep = () => {
    switch (appState) {
      case 'input':
        return 0;
      case 'processing':
        return 1;
      case 'script':
        return 2;
      case 'generating':
        return 3;
      case 'done':
        return 4;
      default:
        return 0;
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: "-100vw" },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "100vw" },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        AI Video Generation Simulation
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Provide inputs to generate a marketing video or a social media reel.
      </Typography>

      <ProgressStepper activeStep={getActiveStep()} />

      <AnimatePresence mode="wait">
        {appState === 'input' && (
          <motion.div
            key="input"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <InputForm onSubmit={handleGenerate} />
          </motion.div>
        )}

        {appState === 'processing' && (
          <motion.div
            key="processing"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ProcessingView onComplete={handleProcessingComplete} />
          </motion.div>
        )}

        {appState === 'script' && (
          <motion.div
            key="script"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ScriptEditor onApprove={handleScriptApprove} />
          </motion.div>
        )}

        {appState === 'generating' && (
          <motion.div
            key="generating"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <VideoGenerationView onComplete={handleGenerationComplete} />
          </motion.div>
        )}

        {appState === 'done' && (
          <motion.div
            key="done"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <FinalVideoView />
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default HomePage;
