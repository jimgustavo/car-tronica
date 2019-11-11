const mongoose = require("mongoose");

// Create Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "Lo siento, es requerido el usuario"],
    unique: false
  },
  hashed_password: {
    type: String,
    required: [true, "Lo siento, es requerida la contraseña"]
  },
  email: {
    type: String,
    trim: true,
    unique: 'Este email ya existe',
    match: [/.+\@.+\..+/, 'Por favor, escribe un formato correcto de email'],
    lowercase: true,
    required: [true, "Sorry brow, you need an email"]
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});



module.exports = User = mongoose.model("User", UserSchema);
//will create a model called item following the ItemSchema
