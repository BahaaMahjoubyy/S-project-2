const express = require('express');
const app = express();
const cors = require("cors");
const PORT = 8080;
const userRoutes = require("../Routes/users");
const news=require('../Routes/news.js')
const posts=require('../Routes/posts.js')
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  // Listen for chat messages
  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



app.use(cors());
app.use(express.json());
app.use("/user", userRoutes)
app.use("/news",news)
app.use("/posts",posts)










app.get('/', (req, res) => {
      res.send('Server Listening');
})
app.listen(PORT, () => {
      console.log(`listen on http://localhost:${PORT}`);
});