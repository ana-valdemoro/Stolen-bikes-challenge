import mongoose from "mongoose";

const StolenBikeSchema = require("./stolenBike");

const models = {
  StolenBike: mongoose.model("StolenBikes", StolenBikeSchema),
};

// We export the models variable to be used in App.
export default models;
