const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  const name = req.query.name || "world";
  res.send(`Hello ${name} from backend!`);
});

app.listen(3000, () => {
  console.log("Backend listening on port 3000");
});
