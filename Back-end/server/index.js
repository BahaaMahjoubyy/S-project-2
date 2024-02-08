const express = require('express');
const app = express();
const cors = require("cors");
const PORT = 8080;
const userRoutes = require("../Routes/users");
const news=require('../Routes/news.js')
const posts=require('../Routes/posts.js')
const chat = require('../Routes/chat.js')



app.use(cors());
app.use(express.json());
app.use("/user", userRoutes)
app.use("/news",news)
app.use("/posts",posts)
app.use("/chat",chat)




app.get('/', (req, res) => {
      res.send('Server Listening');
})
app.listen(PORT, () => {
      console.log(`listen on http://localhost:${PORT}`);
});