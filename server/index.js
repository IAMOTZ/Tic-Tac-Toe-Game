import express from 'express';

const app = express();

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Welcom to nothing');
});

app.listen(port, () => {
  console.log(`App started on ${port}...`);
});
