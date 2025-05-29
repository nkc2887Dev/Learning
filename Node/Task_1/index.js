const express = require('express');
const app = express();
const port = 3000;

// Simple request queue
let isProcessing = false;
const queue = [];

// Function to handle queued requests
const processNext = () => {
  if (queue.length === 0) {
    isProcessing = false;
    return;
  }

  const { res } = queue.shift();
  res.write('wait...'); // Already wrote "waiting..." before
  setTimeout(() => {
    res.end('OK!');
    processNext();
  }, 15000);
};

app.get('/', (req, res) => {
  if (isProcessing) {
    // Immediately respond with "waiting..." for queued request
    res.write('waiting...\n');
    queue.push({ res });
  } else {
    isProcessing = true;
    res.write('wait...\n');
    setTimeout(() => {
      res.end('OK!');
      processNext();
    }, 15000);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});