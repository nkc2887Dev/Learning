const express = require('express');
const app = express();
const port = 3000;

// Simple request queue
let isProcessing = false;
const queue = [];
console.log('queue: ', queue);

// Function to handle queued requests
const processNext = () => {
  if (queue.length === 0) {
    isProcessing = false;
    return;
  }

  isProcessing = true;
  const { res } = queue.shift();

  res.write('wait...');
  setTimeout(() => {
    res.end('OK!');
    processNext();
  }, 15000); // 15 seconds
};

app.get('/', (req, res) => {
  if (isProcessing) {
    // Queue the request
    queue.push({ res });
  } else {
    isProcessing = true;
    res.write('wait...');
    setTimeout(() => {
      res.end('OK!');
      processNext();
    }, 15000);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
