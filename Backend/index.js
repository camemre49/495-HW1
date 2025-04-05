const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Allow Angular frontend to communicate
app.use(express.json()); // Parse JSON requests

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: "Hello from Express backend!" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});