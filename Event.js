const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: false,
      default: 'demo-user',
    },
    eventTitle: {
      type: String,
      required: true,
      trim: true,
    },
    birthdayName: {
      type: String,
      required: true,
      trim: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    guestLimit: {
      type: Number,
      required: true,
      min: 1,
    },
    musicUrl: {
      type: String,
      default: null,
    },
    coverImageUrl: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
