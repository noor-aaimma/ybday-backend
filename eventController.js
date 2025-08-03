const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const Event = require('../models/Event');

const createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    console.log("🟢 Request body:", req.body);
    console.log("🟢 Request file:", req.file);
    // console.log("🟢 User:", req.user); // only when using auth

    const {
      eventTitle,
      name,
      dateTime,
      guestLimit,
      musicLink,
      password,
    } = req.body;

    const coverImage = req.file?.filename;

    let hashedPassword = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const newEvent = new Event({
      eventId: uuidv4(),
      userId: 'demo-user',
      eventTitle,
      birthdayName: name,
      eventDate: dateTime,
      guestLimit,
      musicUrl: musicLink,
      coverImageUrl: coverImage ? `/uploads/${coverImage}` : null,
      password: hashedPassword,
      createdAt: new Date(),
    });

    await newEvent.save();

    return res.status(201).json({ success: true, eventLink: `/event/${newEvent.eventId}` });
  } catch (err) {
    console.error('❌ Error creating event:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createEvent };
