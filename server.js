app.get('/banger/:style', (req, res) => {
  const style = req.params.style.toLowerCase();
  const results = bangers.filter(b => b.style.toLowerCase().includes(style));
  res.json(results.length > 0 ? results : { error: 'No matching banger style found' });
});

app.get('/', (req, res) => {
  res.send('Dabbing API is live');
});

app.listen(PORT, () => {
  console.log(`Banger API listening at http://localhost:${PORT}`);
});
