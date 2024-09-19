const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./configs/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors(
  {
    origin: '*',
}
));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// API routes
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
