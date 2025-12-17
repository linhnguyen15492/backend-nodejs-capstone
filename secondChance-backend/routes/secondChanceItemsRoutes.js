const express = require('express')
const multer = require('multer')
// const path = require('path')
// const fs = require('fs')
const router = express.Router()
const connectToDatabase = require('../models/db')
const logger = require('../logger')

// Define the upload directory path
const directoryPath = 'public/images'

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directoryPath) // Specify the upload directory
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use the original file name
  }
})

const upload = multer({ storage: storage })

// Get all secondChanceItems
router.get('/', async (req, res, next) => {
  logger.info('/ called')
  try {
    // Retrieve the database connection from db.js and store the connection to db constant
    const db = await connectToDatabase()

    // Use the collection() method to retrieve the secondChanceItems collection
    const collection = db.collection('secondChanceItems')

    // Fetch all secondChanceItems using the collection.find() method. Chain it with the toArray() method to convert to a JSON array
    const secondChanceItems = await collection.find({}).toArray()

    // Return the secondChanceItems using the res.json() method
    res.json(secondChanceItems)
  } catch (e) {
    logger.console.error('oops something went wrong', e)
    next(e)
  }
})

// Add a new item
// Upload the image to the images directory
router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    // Retrieve the database connection from db.js and store the connection to db constant
    const db = await connectToDatabase()

    // Use the collection() method to retrieve the secondChanceItems collection
    const collection = db.collection('secondChanceItems')

    // Create a new secondChanceItem from the request body
    let secondChanceItem = req.body

    // Get the last id, increment it by 1, and set it to the new secondChanceItem
    const lastItemQuery = await collection.find().sort({ id: -1 }).limit(1)
    await lastItemQuery.forEach((item) => {
      secondChanceItem.id = (parseInt(item.id) + 1).toString()
    })

    // Set the current date in the new item
    const dateAdded = Math.floor(new Date().getTime() / 1000)
    secondChanceItem.date_added = dateAdded

    // Add the secondChanceItem to the database
    secondChanceItem = await collection.insertOne(secondChanceItem)

    res.status(201).json(secondChanceItem.ops[0])
  } catch (e) {
    next(e)
  }
})

// Get a single secondChanceItem by ID
router.get('/:id', async (req, res, next) => {
  try {
    // Retrieve the database connection from db.js and store the connection in the db constant
    const db = await connectToDatabase()

    // Use the collection() method to retrieve the secondChanceItems collection
    const collection = db.collection('secondChanceItems')

    // Find a specific secondChanceItem by its ID using the collection.fineOne() method. Store it in a constant called secondChanceItem
    const secondChanceItem = await collection.findOne({ id: req.params.id })

    // Return the secondChanceItem as a JSON object. Return an error message if the item is not found
    if (!secondChanceItem) {
      return res.status(404).send('secondChanceItem not found')
    }
    res.json(secondChanceItem)
  } catch (e) {
    next(e)
  }
})

// Update and existing item
router.put('/:id', async (req, res, next) => {
  try {
    // Retrieve the dtabase connection from db.js and store the connection to a db constant
    const db = await connectToDatabase()

    // Use the collection() method to retrieve the secondChanceItems collection
    const collection = db.collection('secondChanceItems')

    const id = req.params.id;

    // Check if the secondChanceItem exists and send an appropriate message if it doesn't exist
    const secondChanceItem = await collection.findOne({ id: id })

    if (!secondChanceItem) {
      logger.error('secondChanceItem not found')
      return res.status(404).json({ error: 'secondChanceItem not found' })
    }

    // Update the item's attributes as follows
    secondChanceItem.category = req.body.category
    secondChanceItem.condition = req.body.condition
    secondChanceItem.age_days = req.body.age_days
    secondChanceItem.description = req.body.description
    secondChanceItem.age_years = Number(
      (secondChanceItem.age_days / 365).toFixed(1)
    )
    secondChanceItem.updatedAt = new Date()
    const updatepreloveItem = await collection.findOneAndUpdate(
      { id },
      { $set: secondChanceItem },
      { returnDocument: 'after' }
    )

    // Send confirmation
    if (updatepreloveItem) {
      res.json({ uploaded: 'success' })
    } else {
      res.json({ uploaded: 'failed' })
    }
  } catch (e) {
    next(e)
  }
})

// Delete an existing item
router.delete('/:id', async (req, res, next) => {
  try {
    // Retrieve the database connection from db.js and store the connection to the db constant
    const db = await connectToDatabase()

    // Use the collection() method to retrieve the secondChanceItem collection
    const collection = db.collection('secondChanceItems')

    // Find a specific secondChanceItem by ID using the collection.fineOne() method and send an appropriate message if it doesn't exist
    const secondChanceItem = await collection.findOne({ id })

    if (!secondChanceItem) {
      logger.error('secondChanceItem not found')
      return res.status(404).json({ error: 'secondChanceItem not found' })
    }

    // Delete the object and send an appropriate message
    await collection.deleteOne({ id })
    res.json({ deleted: 'success' })
  } catch (e) {
    next(e)
  }
})

module.exports = router
