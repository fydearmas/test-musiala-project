const mongoose = require('mongoose');

const gatewaySchema = mongoose.Schema({
  serial: { type: String, required: true },
  name: { type: String, required: true },
  ip: { type: String, required: true },
  devices: []
});

module.exports = mongoose.model('Gateway', gatewaySchema);
