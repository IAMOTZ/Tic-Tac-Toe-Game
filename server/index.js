import express from 'express';
import socketIO from 'socket.io';
import path from 'path';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '..', 'public')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const server = app.listen(port, () => {
  console.log(`App started on ${port}...`);
});

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log(`I have got a new socket with ID: ${socket.id}`);
});
