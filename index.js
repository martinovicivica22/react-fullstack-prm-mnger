// allows you to access environment variables you created in .env
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

// import routes
const authRoute = require("./routes/auth");
const toDosRoute = require("./routes/todos");

//middlewear that allows you pass json
app.use(express.json());
app.use(express.urlencoded());
const reactBuild = path.join(__dirname, "client", "build");
app.use(express.static(reactBuild));

app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, reactBuild, "index.html"));
});

// allows to use and read cookies during requests
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send("fullstack express server");
});

app.use("/api/auth", authRoute);
app.use("/api/todos", toDosRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to db");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
