const mongoose = require('mongoose');

const googleUserSchema = new mongoose.Schema({
  email:String,
  name:String,
});

const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);

module.exports = GoogleUser;
