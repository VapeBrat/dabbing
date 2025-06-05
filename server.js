const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT;
const bangers = require('./bangerData.json');

app.get('/bangers', (req, res) => {
  res.json(bangers);
});

app.get('/banger/:style', (req, res) => {
  const input = req.params.style.toLowerCase().trim();
  const results = bangers.filter(b => 
    b.style.toLowerCase().includes(input) || 
    b.name.toLowerCase().includes(input)
  );
  res.json(results.length > 0 ? results : { error: 'No matching banger style found' });
});

app.get('/openapi.json', (req, res) => {
  const spec = fs.readFileSync('./openapi.json', 'utf8');
  res.setHeader('Content-Type', 'application/json');
  res.send(spec);
});

app.get('/', (req, res) => {
  res.send('Dabbing API is live');
});

app.listen(PORT, () => {
  console.log(`Banger API listening at http://localhost:${PORT}`);
});
