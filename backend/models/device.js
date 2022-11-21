const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
  uid: { type: String, required: true },
  vendor: { type: String, required: true },
  date_created: { type: String, required: true },
  status: { type: String, required: true }
});

module.exports = mongoose.model('Device', deviceSchema);
