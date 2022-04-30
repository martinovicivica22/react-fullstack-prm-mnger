// allows you to access environment variables you created in .env
require("dotenv").config();

const express = require("express");

const app = express();

//middlewear that allows you pass json
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("fullstack express server");
});

app.post("/name", (req, res) => {
  if (req.body.name) {
    return res.json({ name: req.body.name });
  } else {
    return res.status(400).json({ error: "no name provided" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
