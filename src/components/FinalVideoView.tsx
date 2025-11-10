import { Box, Button, Typography } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const FinalVideoView = () => {
  return (
    <Box sx={{ mt: 4, width: '100%', textAlign: 'center' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Your Video is Ready!
      </Typography>
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          height: 'auto',
          bgcolor: 'black',
          margin: 'auto',
          borderRadius: 2,
          aspectRatio: '9 / 16',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <PlayCircleOutlineIcon sx={{ fontSize: 80, color: 'white' }} />
        <Typography sx={{ color: 'white' }}>Video Placeholder</Typography>
      </Box>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" color="primary">
          Download Video
        </Button>
        <Button variant="outlined">Share</Button>
      </Box>
    </Box>
  );
};

export default FinalVideoView;
