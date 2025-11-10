import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Stack,
} from '@mui/material';
import axios from 'axios';

interface InputFormProps {
  onSubmit: (data: { image: string; text: string; link: string; videoType: string }) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [videoType, setVideoType] = useState('auto');
  const [isFetching, setIsFetching] = useState(false);

  const handleFetch = async () => {
    setIsFetching(true);
    try {
      const response = await axios.post('http://localhost:8000/api/scrape', { url: link });
      const { title, image, description } = response.data;
      setImage(image);
      setText(`${title}\n\n${description}`);
    } catch (error) {
      console.error('Failed to fetch product data', error);
      // Optionally, show an error message to the user
    }
    setIsFetching(false);
  };

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
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <TextField
              fullWidth
              label="Product Page Link"
              variant="outlined"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              helperText="Enter a link to a product page to scrape metadata."
            />
            <Button
              variant="contained"
              onClick={handleFetch}
              disabled={isFetching || !link}
              sx={{ height: '56px' }}
            >
              {isFetching ? <CircularProgress size={24} /> : 'Fetch'}
            </Button>
          </Box>

        {image && (
          <Box
            component="img"
            sx={{
              height: 200,
              width: 'auto',
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              borderRadius: 1,
            }}
            alt="Fetched product"
            src={image}
          />
        )}

        <Box>
          <TextField
            fullWidth
            label="Image URL"
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            helperText="This will be populated by the fetch, or you can enter a URL manually."
          />
        </Box>

        <Box>
          <TextField
            fullWidth
            label="Product/Video Text"
            variant="outlined"
            multiline
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            helperText="This will be populated by the fetch, or you can enter text manually."
          />
        </Box>

        <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
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
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Generate Video
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default InputForm;