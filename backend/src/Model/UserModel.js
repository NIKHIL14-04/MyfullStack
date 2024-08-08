import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phonenumber: { type: Number },
    address: { type: String },
    token: [
      {
        token: { type: String },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function () {
  const secretOrPrivateKey = "Nikhil123";
  const options = {
    expiresIn: '1h',
  };

  try {
    const token = jwt.sign({ _id: this._id.toString() }, secretOrPrivateKey, options);
    if (this.token.length > 0) {
        this.token[0].token = token;
      } else {
        this.token.push({ token });
      }
      await this.save(); 
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
