var mongoose = require('mongoose');

var PartnerSchema = new Schema({

    companyID: {
      type: Number,
      required: true,
      index: { unique: true }
    }, 
    companyName: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    }, 
      primaryContact: {
      type: String,
      required: true,
    },
    companyPhoneNumber: {
      type: Number,
      required: true,
    }, 
    status: {
      type: String,
      default: "Pending",
      required: true,
    }, 
    dateCreated: { 
      type: Date, 
      default: Date.now 
    }
});

module.exports = mongoose.model('Partner', BookSchema);