import { Box, Grid, Paper, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const viewsData = [
  { name: 'Video 1', views: 4000 },
  { name: 'Video 2', views: 3000 },
  { name: 'Video 3', views: 2000 },
  { name: 'Video 4', views: 2780 },
  { name: 'Video 5', views: 1890 },
];

const engagementData = [
  { name: 'Day 1', likes: 120, comments: 30 },
  { name: 'Day 2', likes: 150, comments: 45 },
  { name: 'Day 3', likes: 200, comments: 60 },
  { name: 'Day 4', likes: 180, comments: 50 },
  { name: 'Day 5', likes: 250, comments: 70 },
];

const AnalyticsDashboard = () => {
  return (
    <Box sx={{ mt: 4, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6">Video Views</Typography>
            <ResponsiveContainer>
              <BarChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6">Engagement Over Time</Typography>
            <ResponsiveContainer>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="likes" stroke="#82ca9d" />
                <Line type="monotone" dataKey="comments" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;
