var mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/quoting"); // use with modules.exports on line 19

var PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pet must have a name"],
      minlength: [3, "Name must be at least 3 characters long."],
      unique: [true, "This name already exists"]
    },
    type: {
      type: String,
      required: [true, "Pet must have a type"],
      minlength: [3, "Type must be at least 3 characters long."]
    },
    description: {
      type: String,
      required: [true, "Pet must have a description"],
      minlength: [3, "Description must be at least 3 characters long."]
    },
    skill1: { type: String },
    skill2: { type: String },
    skill3: { type: String },
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Pet", PetSchema);
mongoose.model("Pet", PetSchema);
