const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    number:{
        type: Number,
        unique: true,
        required: true
    },
  
    balance: {
    type: Number,
    required: true,
  },
  goal: {
    type: Number,
    min: 51,
    required: true
  },
  lastUpdatedAt: {
    type: Date, 
    default: Date.now }
  ,
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    unique: true
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
