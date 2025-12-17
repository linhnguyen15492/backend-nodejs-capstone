const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const connectToDatabase = require("../models/db");
const dotenv = require("dotenv");
const logger = require("../logger");
dotenv.config();

//Create JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  logger.info("/register called");
  try {
    // Connect to `secondChance` in MongoDB through `connectToDatabase` in `db.js`.
    const db = await connectToDatabase();

    // Access MongoDB `users` collection
    const collection = db.collection("users");

    // Check if user credentials already exists in the database and throw an error if they do
    const existingEmail = await collection.findOne({ email: req.body.email });

    if (existingEmail) {
      logger.error("Email id already exists");
      return res.status(400).json({ error: "Email id already exists" });
    }

    // Create a hash to encrypt the password so that it is not readable in the database
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(req.body.password, salt);

    // Insert the user into the database
    const newUser = await collection.insertOne({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hash,
      createdAt: new Date(),
    });

    // Create JWT authentication if passwords match with user._id as payload
    const payload = {
      user: {
        id: newUser.insertedId,
      },
    };
    const authtoken = jwt.sign(payload, JWT_SECRET);

    // Log the successful registration using the logger
    logger.info("User registered successfully");

    // Return the user email and the token as a JSON
    return res.status(200).json({ authtoken, email });
  } catch (e) {
    logger.error(e);
    return res.status(500).send("Internal server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    // Connect to `secondChance` in MongoDB through `connectToDatabase` in `db.js`.
    const db = await connectToDatabase();

    // Access MongoDB `users` collection
    const collection = db.collection("users");

    // Check for user credentials in database
    const theUser = await collection.findOne({ email: req.body.email });

    // Check if the password matches the encrypted password and send appropriate message on mismatch
    if (theUser) {
      let result = await bcryptjs.compare(req.body.password, theUser.password);
      if (!result) {
        logger.error("Passwords do not match");
        return res.status(404).json({ error: "Wrong pasword" });
      }

      // Fetch user details from a database
      const userName = theUser.firstName;
      const userEmail = theUser.email;

      // Create JWT authentication if passwords match with user._id as payload
      let payload = {
        user: {
          id: theUser._id.toString(),
        },
      };

      const authtoken = jwt.sign(payload, JWT_SECRET);

      logger.info("User logged in successfully");
      return res.status(200).json({ authtoken, userName, userEmail });
    }
  } catch (e) {
    // Send appropriate message if the user is not found
    logger.error("User not found");
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
