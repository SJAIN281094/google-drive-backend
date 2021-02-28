const mongoose = require('mongoose');

const foldersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    filesSize: {
      type: Number,
      trim: true,
      default: 0,
    },
    parent: {
      type: String,
      trim: true,
      default: null,
    },
    path: {
      type: [{ type: String }],
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('folders', foldersSchema);
