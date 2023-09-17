const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: String,
});

const stateSchema = new mongoose.Schema({
  name: String,
  cities: [citySchema],
});

const countrySchema = new mongoose.Schema({
  name: String,
  states: [stateSchema],
});

const Country = mongoose.model("countries", countrySchema);

module.exports = Country;
