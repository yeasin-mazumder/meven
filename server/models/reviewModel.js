const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Review user-name is required"],
    },

    photo: {
      type: String,
      required: [true, "Review user-photo is required"],
    },

    rating: {
      type: Number,
      required: [true, "Ratings can not be empty"],
      min: [1, "Ratings can not be bellow 1"],
      max: [5, "Ratings can not be over 5"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    variant: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
      required: [true, "Product reference is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
