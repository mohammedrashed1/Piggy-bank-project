const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    number:{
        type: Number,
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
  }
  ,
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
