const mongoose = require("mongoose");

// Create Schema
const StockSchema = new mongoose.Schema({
  productName: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  keywords: { type: String },
  image: { type: String },
  price: { type: Number },
  date: { type: Date, default: Date.now }
});

module.exports = Good = mongoose.model("Good", StockSchema);
//will create a model called item following the ItemSchema
