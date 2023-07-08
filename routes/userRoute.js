const express = require("express");
const userModel = require("../models/userModel");

const router = express.Router();

//Create Api
router.post("/create", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const userData = await userModel.create({
      name: name,
      email: email,
      age: age,
    });

    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong" });
  }
});

//get data from api
router.get("/getData", async (req, res) => {
  try {
    const data = await userModel.find();
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//get single user data
router.get("/getData/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleUser = await userModel.findOne({ _id: id });
    if (!singleUser) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(singleUser);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//get single user
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { name, email, age },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      res.status(404).send({ error: "User Not found" });
    }
    res.status(201).send(updatedUser);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleUser = await userModel.deleteOne({ _id: id });
    res.status(201).json(singleUser);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
module.exports = router;
