const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Your existing routes and middlewares

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
