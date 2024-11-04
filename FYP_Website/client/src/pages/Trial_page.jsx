import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Paper, Typography, AppBar, Toolbar, IconButton, Badge } from '@mui/material';
import { Notifications, AccountCircle } from '@mui/icons-material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis,Cell,Pie,PieChart, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';

import '../css/t.css';

import { faShoppingCart, faBox, faTools } from '@fortawesome/free-solid-svg-icons';
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


    const [suppliersData, setSuppliersData] = useState([]);
    const [ordersData, setOrdersData] = useState([]);
    const [OurordersData, setOurOrdersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [grossProfit, setGrossProfit] = useState(0);
  
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [inventoryData, setInventoryData] = useState([]);
    const [inventoryBikeData, setInventoryBikeData] = useState([]);
    const [selectedPart, setSelectedPart] = useState(inventoryData.length > 0 ? inventoryData[0].unit : '');
  
    const [selectedBike, setSelectedBike] = useState(inventoryBikeData.length > 0 ? inventoryBikeData[0].unit : '');
    const [selectedSupplier, setSelectedSupplier] = useState(suppliersData.length > 0 ? suppliersData[0].supplier : '');
    const [sortedInventoryData, setSortedInventoryData] = useState([]);

    const [queueCount, setQueueCount] = useState(0);
    const [employeeCount, setEmployeeCount] = useState(0);
    const [yearlySales, setYearlySales] = useState(null);
    const [bestProduct, setBestProduct] = useState('');



    useEffect(() => {
      const fetchInventoryData = async () => {
        const response = await axios.get('http://localhost:3001/getPartWarehouses');
        const processedData = response.data.map(item => ({
          unit: item.component_storage_name,
          currentStockPercentage: (item.component_storage_current_stock / item.component_storage_capacity) * 100,
          capacity: item.component_storage_capacity,
          currentStock : item.component_storage_current_stock
        }));
        setInventoryData(processedData);
        
        // Sort the data and set it to the new state
        const sorted = [...processedData].sort((a, b) => a.currentStockPercentage - b.currentStockPercentage);
        setSortedInventoryData(sorted);
      };
  
      fetchInventoryData();
      const fetchBikeInventoryData = async () => {
        const response = await axios.get('http://localhost:3001/getProductWarehouses');
        const processedBikeData = response.data.map(item => ({
          unit: item.byproduct_storage_name,
          currentStockBikePercentage: (item.byproduct_storage_current_stock / item.byproduct_storage_capacity) * 100,
          capacity: item.byproduct_storage_capacity,
          currentStock : item.byproduct_storage_current_stock
        }));
        setInventoryBikeData(processedBikeData);
      };
  
      fetchBikeInventoryData();
      const fetchCustomerOrders = async () => {
        const response = await axios.get('http://localhost:3001/getbyProducts');
        const ordersData = response.data.map(order => ({
          date: new Date(order.date),
          quantity: order.quantity,
          total_price: order.total_price
        }));
        const filteredOrdersData = ordersData.filter(order => order.date.getFullYear() === 2024);
        const monthlySummary = filteredOrdersData.reduce((summary, order) => {
          const monthKey = `${order.date.getFullYear()}-${order.date.getMonth() + 1}`;
          if (!summary[monthKey]) {
            summary[monthKey] = { orders: 0, revenue: 0 };
          }
          summary[monthKey].orders++;
          summary[monthKey].revenue += order.total_price;
          return summary;
        }, {});
        const ordersByMonth = Object.keys(monthlySummary).map(monthKey => ({
          month: monthKey,
          orders: monthlySummary[monthKey].orders,
          revenue: monthlySummary[monthKey].revenue
        }));
        setOrdersData(ordersByMonth);
        setTotalRevenue(filteredOrdersData.reduce((total, order) => total + parseFloat(order.total_price), 0).toFixed(2));
      };
      fetchCustomerOrders();
      const fetchOurOrders = async () => {
        const response = await axios.get('http://localhost:3001/getOrders');
        const OurordersData = response.data.map(order => ({
          date: new Date(order.date_ordered),
          quantity: order.quantity,
          total_price: order.price !== null ? parseFloat(order.price) : 0
        }));
        const filteredOurOrdersData = OurordersData.filter(order => order.date.getFullYear() === 2024);
        const monthlySummary = filteredOurOrdersData.reduce((summary, order) => {
          const monthKey = `${order.date.getFullYear()}-${order.date.getMonth() + 1}`;
          if (!summary[monthKey]) {
            summary[monthKey] = { orders: 0, expenses: 0 };
          }
          summary[monthKey].orders++;
          summary[monthKey].expenses += order.total_price;
          return summary;
        }, {});
        const ordersByMonth = Object.keys(monthlySummary).map(monthKey => ({
          month: monthKey,
          orders: monthlySummary[monthKey].orders,
          expenses: monthlySummary[monthKey].expenses
        }));
        setOurOrdersData(ordersByMonth);
        setTotalExpenses(filteredOurOrdersData.reduce((total, order) => total + parseFloat(order.total_price), 0).toFixed(2));
      };
      fetchOurOrders();
      const fetchSuppliersData = async () => {
        const response = await axios.get('http://localhost:3001/getOrders');
        const suppliersMap = response.data.reduce((acc, order) => {
          const { supplier_name, lead_time } = order;
          if (!acc[supplier_name]) {
            acc[supplier_name] = { totalLeadTime: 0, orderCount: 0 };
          }
          acc[supplier_name].totalLeadTime += lead_time;
          acc[supplier_name].orderCount++;
          return acc;
        }, {});
        const suppliersData = Object.keys(suppliersMap).map(supplierName => ({
          supplier: supplierName,
          orders: suppliersMap[supplierName].orderCount,
          deliveryTime: suppliersMap[supplierName].totalLeadTime / suppliersMap[supplierName].orderCount
        }));
        setSuppliersData(suppliersData);
      };
      fetchSuppliersData();

      const fetchEmployeeCount = async () => {
        const response = await axios.get('http://localhost:3001/getEmployeeCount');
        setEmployeeCount(response.data.employeeCount);
      };
      fetchEmployeeCount();

      const fetchProductionQueue = async () => {
        try {
          setLoading(true);
          const response = await axios.get('http://localhost:3001/getproductionqueue');
          setQueueCount(response.data.employeeCount); // Note: The backend sends 'employeeCount' but it's actually the queue count
          setLoading(false);
        } catch (err) {
          console.error('Error fetching production queue:', err);
          // setError('Failed to fetch production queue count');
          // setLoading(false);
        }
        };
      fetchProductionQueue();

      const fetchBestSellingProduct = async () => {
        try {
          setLoading(true);
          const response = await axios.get('http://localhost:3001/getBestSellingProduct');
          setBestProduct(response.data.bestSellingProduct);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching best selling product:', err);
          // setError('Failed to fetch best selling product');
          // setLoading(false);
        }
      };
      fetchBestSellingProduct();

      const fetchYearlySales = async () => {
        try {
          const response = await axios.get('http://localhost:3001/getYearlySales');
          setYearlySales(response.data.yearlySales);
          setLoading(false);
        } catch (err) {
          // setError('Error fetching yearly sales data');
          // setLoading(false);
        }
      };
      fetchYearlySales();
    }, []);

    const COLORS = ['#8FD694', '#7BCFA9', '#67C7BE', '#52BFD3', '#3DB7E8', '#28AFFD', '#14A7FF', '#009FFF'];

  return (
  <>
    <div className="dashboard2">
      {/* <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard</p> 
      </header> */}

      <div className="stats-overview">
        <div className="stat-box">
          <h2>{queueCount}</h2>
          <p>Production queue</p>
        </div>
        <div className="stat-box">
          <h2>{employeeCount}</h2>
          <p>Number of employees</p>
        </div>
        <div className="stat-box">
          <h2>{yearlySales}</h2>
          <p>Yearly sales</p>
        </div>
        <div className="stat-box">
          <h2>{bestProduct}</h2>
          <p>Best selling product</p>
        </div>
      </div>

      <div className="main-content">
      <div className="chart-box">
            <h3>Supplier Orders</h3>
            <BarChart width={1150} height={350} data={suppliersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis yAxisId="left" orientation="left" stroke="#808080" />
                <YAxis yAxisId="right" orientation="right" stroke="#808080" />
                {/* <YAxis yAxisId="right" orientation="right" stroke="#2ecc71" />                <Tooltip /> */}
                <Legend 
                    formatter={(value, entry, index) => (
                      <span style={{ color: '#808080' }}>{value}</span>
                  )}
                />
    <Bar dataKey="orders" fill="#2ecc71" name="Orders" yAxisId="right" /> {/* Bright green */}
    <Bar dataKey="deliveryTime" fill="#16a085" name="Avg. Delivery Time (Days)" yAxisId="left" /> {/* Darker green */}
            </BarChart>
      </div>
        {/* <div className="stat-box-container">
            {suppliersData.filter(supplier => supplier.supplier === selectedSupplier)
                .map((supplier, index) => (
                    <div className="stat-box suppliers" key={index} style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                        <div className="stat-content">
                            <h3>Supplier {supplier.supplier}</h3>
                            <p>Orders: {supplier.orders}</p>
                        </div>
                    </div>
            ))}
        </div> */}
        <div className="side-section">
          {/* <div className="recent-transactions box">Recent Transactions</div>
          <div className="campaign box">Campaign</div> */}
          <div className="sales-quantity box">
            <h3>Product warehouse distribution</h3> 
            <ResponsiveContainer width={330} height={300}>
              <PieChart>
                <Pie
                  data={inventoryBikeData}
                  dataKey="currentStockBikePercentage"
                  nameKey="unit"
                  cx="40%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {inventoryBikeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  layout="vertical" 
                  align="right" 
                  verticalAlign="middle"
                  wrapperStyle={{
                    paddingLeft: "20px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
        </div>
        </div>
      </div>


      <div className="additional-content">


      <div className="orders-expenses lower-box">
        {/* <h3 style={{padding:'0px',margin:'0px'}}>Orders and Expenses Overview</h3> */}
        
        <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ width: '50%', textAlign: 'left', padding: '0px'}}>
                <h3>Total Orders:{OurordersData.reduce((total, data) => total + data.orders, 0)}</h3>
              </div>
              <div style={{ width: '50%', textAlign: 'left', padding: '0px' }}>
                <h3>Total Expenses: ${totalExpenses}</h3>
              </div>
        </div>
            <BarChart width={800} height={200} data={OurordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="orders" fill={COLORS[0]} name="Total Orders">
                {OurordersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
              <Bar yAxisId="right" dataKey="expenses" fill={COLORS[1]} name="Total Expenses">
                {OurordersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>

            



        </div>










        <div className="product-warehouse-distribution lower-box">
            <h3>Inventory Breakdown for the Parts warehouse</h3>
            <BarChart width={750} height={220} data={sortedInventoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="unit" type="category" />
                <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                          return (
                              <div style={{ 
                                  backgroundColor: '#fff', 
                                  padding: '0px', 
                                  border: '1px solid #ccc',
                                  color: 'green'  // This sets the font color to green
                              }}>
                                  <p>{`${payload[0].name} : ${payload[0].value.toFixed(2)}%`}</p>
                              </div>
                          );
                      }
                      return null;
              }}
                />
                <Legend />
                <Bar dataKey="currentStockPercentage" name="Current Stock Percentage">
                    {sortedInventoryData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[Math.floor((index / sortedInventoryData.length) * COLORS.length)]} 
                        />
                    ))}
                </Bar>
            </BarChart>
        </div>
      </div>
    </div>





















  </>
    // <Box sx={{ flexGrow: 1 }}>
    //   {/* App Bar */}
    //   <AppBar position="static" sx={{ backgroundColor: '#151a25' }}>
    //     <Toolbar>
    //       <Typography variant="h6" sx={{ flexGrow: 1 }}>
    //         Supply Chain Management
    //       </Typography>
    //       {/* <IconButton color="inherit">
    //         <Badge badgeContent={4} color="error">
    //           <Notifications />
    //         </Badge>
    //       </IconButton> */}
    //       <IconButton color="inherit">
    //         <AccountCircle />
    //       </IconButton>
    //     </Toolbar>
    //   </AppBar>

    //   {/* Main Grid Layout */}
    //   <Grid container spacing={3} sx={{ padding: 3 }}>
    //     {/* Summary Cards */}
    //     <Grid item xs={12} md={4}>
    //       <Paper sx={{ padding: 2, textAlign: 'center' }}>
    //         <Typography variant="h5" gutterBottom>
    //           Total Orders
    //         </Typography>
    //         <Typography variant="h3">1,234</Typography>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={12} md={4}>
    //       <Paper sx={{ padding: 2, textAlign: 'center' }}>
    //         <Typography variant="h5" gutterBottom>
    //           Inventory Status
    //         </Typography>
    //         <Typography variant="h3">56%</Typography>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={12} md={4}>
    //       <Paper sx={{ padding: 2, textAlign: 'center' }}>
    //         <Typography variant="h5" gutterBottom>
    //           Shipping Status
    //         </Typography>
    //         <Typography variant="h3">On Time</Typography>
    //       </Paper>
    //     </Grid>

    //     {/* Line Chart */}
    //     <Grid item xs={12}>
    //       <Paper sx={{ padding: 2 }}>
    //         <Typography variant="h6" gutterBottom>
    //           Orders vs Inventory
    //         </Typography>
    //         <ResponsiveContainer width="100%" height={300}>
    //           <LineChart data={data}>
    //             <CartesianGrid stroke="#e0e0e0" />
    //             <XAxis dataKey="name" />
    //             <YAxis />
    //             <Tooltip />
    //             <Line type="monotone" dataKey="orders" stroke="#1976d2" />
    //             <Line type="monotone" dataKey="inventory" stroke="#82ca9d" />
    //           </LineChart>
    //         </ResponsiveContainer>
    //       </Paper>
    //     </Grid>
    //   </Grid>
    // </Box>
  );
};

export default Trial_page;