const mongoose = require("mongoose");

<<<<<<< HEAD
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    interviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Interview" }],
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["customer", "user"],
    },
    avatar: {
      public_id: String,
      url: String,
    },
=======

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  interviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Interview" }],
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["customer", "user"],
>>>>>>> 44b08ddc7ad122871a5038f2ea45bbd7b304d48b
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);



module.exports = UserModel;
