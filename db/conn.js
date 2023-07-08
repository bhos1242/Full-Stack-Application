const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.URL}`);
    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
