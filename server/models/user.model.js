const mongoose = require("mongoose");

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
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);



module.exports = UserModel;
