import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your full name."],
    },
    email: {
      type: String,
      required: [true, "Please provide your email."],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please a valid email."],
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: 6,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password."],
      validate: {
        validator(el) {
          return el === this.password;
        },
        message: "Password are not the same.",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: "",
    },
    address: [
      {
        firstName: String,
      },
      {
        lastName: String,
      },
      {
        phoneNumber: Number,
      },
      {
        address1: String,
      },
      {
        address2: String,
      },
      {
        city: String,
      },
      {
        zipCode: String,
      },
      {
        country: String,
      },
      {
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete confirmPassword field
  this.confirmPassword = undefined;
  next();
});

// // Password checking for login
// userSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
