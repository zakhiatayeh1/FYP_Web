// src/HomePage.js
import React from 'react';
import { Box, Grid, Paper, Typography, AppBar, Toolbar, IconButton, Badge } from '@mui/material';
import { Notifications, AccountCircle } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the charts
const data = [
  { name: 'Jan', inventory: 4000, orders: 2400 },
  { name: 'Feb', inventory: 3000, orders: 1398 },
  { name: 'Mar', inventory: 2000, orders: 9800 },
  { name: 'Apr', inventory: 2780, orders: 3908 },
  { name: 'May', inventory: 1890, orders: 4800 },
  { name: 'Jun', inventory: 2390, orders: 3800 },
  { name: 'Jul', inventory: 3490, orders: 4300 },
];

const Trial_page = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Supply Chain Management
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Grid Layout */}
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Total Orders
            </Typography>
            <Typography variant="h3">1,234</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Inventory Status
            </Typography>
            <Typography variant="h3">56%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Shipping Status
            </Typography>
            <Typography variant="h3">On Time</Typography>
          </Paper>
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Orders vs Inventory
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid stroke="#e0e0e0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#1976d2" />
                <Line type="monotone" dataKey="inventory" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Trial_page;
