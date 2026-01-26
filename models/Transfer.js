const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
 sender:{
    type: Number,
 },
 recevier:{
    type: Number,
    required: true
 },
 money: Number
 ,
 comment: String
});

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
