const mongoose = require('mongoose');

const filesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    size: {
      type: Number,
      trim: true,
      required: true,
    },
    format: {
      type: String,
      trim: true,
      required: true,
    },
    dimension: {
      type: String,
      trim: true,
      required: true,
    },
    folderId: {
      type: [{ type: String }],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('files', filesSchema);
