const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Allow Angular frontend to communicate
app.use(express.json()); // Parse JSON requests

// Test route
app.get('/test', (req, res) => {
  res.json({ message: "Hello from Express backend!" });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, role: user.role });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/users', (req, res) => {
  res.send("admin");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});