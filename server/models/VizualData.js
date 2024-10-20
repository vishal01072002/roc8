/*
function dateFormater (date) {
  const excelEpoc = new Date(1900, 0, -1).getTime();
  const msDay = 86400000;

  return new Date(excelEpoc + (date * msDay));
}

var TempSchema = new Schema({
  email: { type: String, set: dateFormater } 
});
*/

const mongoose = require("mongoose");

const VizualDataSchema = new mongoose.Schema({
  Sno:{
    type:Number,
    required: true,
  },
  Day:{
    type:Date,
    required: true,
  },
  Gender:{
      type:String,
      required:true,
      trim:true,
  },
  Age:{
      type:String,
      required:true,
      trim:true,
  },
  IsYoung:{
      type:Boolean,
      required:true,
  },
  A:{
    type:Number,
    required: true,
  },
  B:{
    type:Number,
    required: true,
  },
  C:{
  type:Number,
    required: true,
  },
  D:{
    type:Number,
    required: true,
  },
  E:{
    type:Number,
    required: true,
  },
  F:{
    type:Number,
    required: true,
  },
},{timestamps:true});

module.exports = mongoose.model("VizualData",VizualDataSchema);