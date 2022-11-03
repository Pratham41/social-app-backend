const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
require("./config/db");
const userRoute = require("./routes/user");
const uploadRoute = require("./routes/upload");
const postRoute = require("./routes/post");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);

const __directoryName = path.resolve();
app.use("/uploads", express.static(path.join(__directoryName, "/uploads")));

let port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
