const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please prodive your email address"],
      validate: [validator.isEmail, "Please provide a valid email address"],
      lowercase: true,
      unique: true,
    },

    photo: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: function (v) {
          return validator.isMobilePhone(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    role: {
      type: String,
      enum: {
        values: ["user", "aklogicAdmin"],
        message: "{VALUE} is not supported",
      },
      default: "user",
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      validate: {
        validator: function (val) {
          return /^\S*$/.test(val);
        },
        message: "Space is not allowed in password",
      },
      minLength: [8, "Minimum password length is 8 character"],
      maxLength: [25, "Maximum password length is 25 character"],
      select: false,
    },

    confirmPassword: {
      type: String,
      required: [true, "Confirm your password please"],
      validate: {
        // This only works on CREATE and SAVE!
        validator: function (val) {
          return val === this.password;
        },
        message: "Password does not matched",
      },
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    active: {
      type: Boolean,
      default: true,
      select: false,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

// DOCUMENT MIDDLEWARES:
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next(); // "isNew" determine if the doc is new (like while sign-up) or previously existed.

  this.passwordChangedAt = Date.now() - 1000; // subtracting 1 second to delay a bit, so that the "passwordChangedAt" may remains less < than the JWT issued time
  next();
});

// QUERY MIDDLEWARES:
userSchema.pre(/^find/, function (next) {
  // "this" points to the current query
  this.find({ active: { $ne: false } });
  next();
});

// INSTANCE METHODS:
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTIssuedTime) {
  if (this.passwordChangedAt) {
    const passwordChangeTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTIssuedTime < passwordChangeTime; // Example: (100 < 200) --> True --> Password has Changed after the Token was provided
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // for 10 minutes of expire time
  return this.passwordResetToken;
};

const User = model("User", userSchema);
module.exports = User;
