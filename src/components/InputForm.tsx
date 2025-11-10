import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from '@mui/material';

interface InputFormProps {
  onSubmit: (data: { image: string; text: string; link: string; videoType: string }) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [videoType, setVideoType] = useState('auto');

  const handleSubmit = () => {
    onSubmit({ image, text, link, videoType });
  };

  return (
    <Box
      component="form"
      sx={{
        mt: 4,
        p: 4,
        bgcolor: 'background.paper',
        borderRadius: 2,
        width: '100%',
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Image URL"
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            helperText="Enter a URL to an image for the video."
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Product/Video Text"
            variant="outlined"
            multiline
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            helperText="Describe the product or provide text for the video."
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Product Page Link"
            variant="outlined"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            helperText="Enter a link to a product page to scrape metadata."
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Video Type</InputLabel>
            <Select
              value={videoType}
              onChange={(e) => setVideoType(e.target.value)}
              label="Video Type"
            >
              <MenuItem value="auto">Auto</MenuItem>
              <MenuItem value="ad">Marketing Advertisement</MenuItem>
              <MenuItem value="reel">Social Media Reel</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Generate Video
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputForm;
