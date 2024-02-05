const express = require('express');
const app = express();
const cors = require("cors");
const PORT = 8080;
const userRoutes = require("../Routes/users");






app.use(cors());
app.use(express.json());
app.use("/user", userRoutes)











app.get('/', (req, res) => {
      res.send('Server Listening');
})
app.listen(PORT, () => {
      console.log(`listen on http://localhost:${PORT}`);
});