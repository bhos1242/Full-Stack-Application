const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./db/conn.js");
const cors = require("cors");

//route
const userRoute = require("./routes/userRoute.js");

//.env configuration
dotenv.config();

//parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

//db connection
connectDB();

app.get("/", (req, res) => {
  res.send("Server running");
});

app.use("/api/user", userRoute);

//Server listening at port
app.listen(
  process.env.PORT,
  console.log(`Server running at port number ${process.env.PORT}`)
);
