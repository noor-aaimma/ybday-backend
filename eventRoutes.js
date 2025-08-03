const express = require('express');
const multer = require('multer');
const { check } = require('express-validator');
const { createEvent } = require('../controllers/eventController');

const router = express.Router();

// Image Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Validation rules
const validateEvent = [
  check('eventTitle').notEmpty().withMessage('Event title is required'),
  check('name').notEmpty().withMessage('Birthday name is required'),
  check('dateTime').notEmpty().withMessage('Event date & time is required'),
  check('guestLimit')
    .notEmpty().withMessage('Guest limit is required')
    .isInt({ min: 1 }).withMessage('Guest limit must be a positive number'),
];

// Route
router.post('/',  upload.single('coverImage'), validateEvent, createEvent);

module.exports = router;
