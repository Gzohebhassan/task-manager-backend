const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();
connectDB();

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://your-frontend-url.vercel.app', // Vercel production
  'https://your-frontend-url.com' // Your custom domain
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  }
}));

app.use(express.json());

app.use('/api/task', authMiddleware, taskRoutes);
app.use('/api/users', userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
