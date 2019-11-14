const mongoose = require("mongoose");
const crypto = require("crypto");

// Create Schema
const UserSchema = new mongoose.Schema({
  name: {
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
})

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}



module.exports = User = mongoose.model("User", UserSchema);
//will create a model called item following the ItemSchema
