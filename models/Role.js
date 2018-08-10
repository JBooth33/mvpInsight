const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  role: {
    type: String,
    required: true
  },
  news: {
    type: Boolean,
    required: true
  },
  request_quote: {
    type: Boolean,
    required: true
  },
  tracking_shipment: {
    type: Boolean,
    required: true
  },
  create_delivery: {
    type: Boolean,
    required: true
  },
  wms_app: {
    type: Boolean,
    required: true
  },
  ltl_app: {
    type: Boolean,
    required: true
  },
  calendar: {
    type: Boolean,
    required: true
  },
  invoices: {
    type: Boolean,
    required: true
  },
});



const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;
