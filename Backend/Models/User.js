import mongoose from "mongoose";

const userLoginSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "UserLogin" } // 👈 collection name
);

const UserLogin = mongoose.model("UserLogin", userLoginSchema);

export default UserLogin;
