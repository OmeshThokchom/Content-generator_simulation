import { Box, Button, TextField, Typography } from '@mui/material';

const mockScript = `
Scene 1: A beautiful shot of a steaming cup of Assam tea.
Narrator: "Start your day with the authentic taste of Assam."

Scene 2: Close-up on the tea leaves.
Narrator: "Handpicked from the finest gardens."

Scene 3: A person enjoying the tea, looking refreshed.
Narrator: "Experience the warmth and richness in every sip."

Caption: #AssamTea #Organic #MorningRitual
Call to Action: Order now and get 10% off!
`;

const ScriptEditor = ({ onApprove }) => {
  return (
    <Box sx={{ mt: 4, width: '100%' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Generated Script
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={10}
        defaultValue={mockScript}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="outlined" color="secondary">
          Regenerate
        </Button>
        <Button variant="contained" color="primary" onClick={onApprove}>
          Approve & Generate Video
        </Button>
      </Box>
    </Box>
  );
};

export default ScriptEditor;
