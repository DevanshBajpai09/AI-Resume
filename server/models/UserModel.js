import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Only required for email/password accounts
    password: {
      type: String,
      required: false,
    },

    // OAuth provider IDs
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    emailVerifyToken: {
      type: String,
    },

    emailVerifyTokenExpiry: {
      type: Date,
    },

    isPremium: {
      type: Boolean,
      default: false,
    },

    premiumActivatedAt: Date,

    premiumExpiresAt: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;