const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Define the port you want your API to run on

// Serve your JSON data
app.get('/api/products', (req, res) => {
  res.json(data); // Serve the JSON data
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
