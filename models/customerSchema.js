const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let customerSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },

  name: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CustomerLists', customerSchema);