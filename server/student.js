const mongoose = require("mongoose");

const { Schema } = mongoose;

const StudentSchema = new Schema(
  {
    firstName:{
      type: String,
      required: true,
    },
    lastName:{
      type: String,
      required: true,
    },
    course: String,
  },
  {
    timestamps: true,
    versionKey: false,
    

  }
);

module.exports = mongoose.model("Student", StudentSchema);
