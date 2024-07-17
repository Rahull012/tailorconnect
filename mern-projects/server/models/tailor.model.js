
// Tailor model definition using Mongoose
const mongoose = require('mongoose');

const tailorSchema = new mongoose.Schema({
  name: { type: String, required: true,unique:true },
  email: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  password: { type: String, required: true },
 Number: { type: String, required: true },
  emailVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String,
    default: null
  },
  otpExpiration: {
    type: Date,
    default: null
  },
  url: { type: String, required: true },
  rating: { type: Number, required: true },
  count: { type: Number, required: true },
  currentrating:{ type : Number,required:true}
  
});

const tailorData = mongoose.model('tailorData', tailorSchema);

module.exports = tailorData;

