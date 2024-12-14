const fs = require("fs");
const Review = require("../models/reviewModel");
const Variant = require("../models/variantModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { getAll, getOne } = require("../utils/handleFactory");
const { patch } = require("../routes");
const path = require("path");

exports.addReviewController = catchAsync(async (req, res, next) => {
  const body = req.body;

  console.log(body,"............body")

  if (req.file) {
    const { fieldname } = req.file;
    body[fieldname] = `${req.protocol}://${req.get("host")}/uploads/reviews/${
      req.file.filename
    }`;
  } else {
    delete body.photo;
  }

  try {
    const review = await Review.create(body);

    const variant = await Variant.findOneAndUpdate(
      { _id: review.variant },
      { $push: { reviews: review._id } },
      { new: true }
    );

    if (!variant) {
      return next(new AppError("Occured an error while creating varient", 500));
    }

    res.status(201).json({
      status: "success",
      message: "Review has been added successfully",
      data: {
        review,
      },
    });
  } catch (error) {
    const filePath = `uploads/reviews/${req.fileName}`;

    fs.unlink(filePath, (err) => {
      if (err && req.file)
        return next(
          new AppError("Something gone wrong while adding a review", 500)
        );
    });

    if (error.errors) {
      const messages = Object.values(error.errors)
        .map((item) => item.properties.message)
        .join(", ");

      return next(new AppError(`Validation failed, ${messages}.`, 400));
    } else if (error.code === 11000) {
      const field = Object.keys(error.keyPattern).join(" ");
      const capitalizeField =
        field.charAt(0).toUpperCase() + field.slice(1).toLocaleLowerCase();

      const message = `${capitalizeField} already exist, Please use another ${field}.`; // ${err.keyValue.name}
      return next(new AppError(message, 409));
    }

    return next(
      new AppError(`Something went wrong while adding a review`, 400)
    );
  }
});

exports.getAllReviewsController =catchAsync(async (req, res, next) => {
    const review = await Review.find()
    .populate({
        path: "variant",
        select:('product'),
        populate:({
            path:"product",
            select:('name')
        })
    })
    res.status(201).json({
        status: "success",
        message: "Review has been get successfully",
        data: {
          doc:review,
        },
      });
});

exports.getReviewController = getOne(Review);

exports.deleteReviewController = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    return next(new AppError("No review was found with that ID!", 404));
  }

  // REMOVING FROM VARIANT ARRAY:
  const variant = await Variant.findOneAndUpdate(
    { _id: review.variant },
    { $pull: { reviews: review._id } },
    { new: true }
  );

  if (!variant) {
    return next(new AppError("No variant was found with that ID!", 404));
  }

  // PHOTO DELETING FROM SERVER:
  const photoName = review.photo.split("/");
  const photoPath = `uploads/reviews/${photoName[photoName.length - 1]}`;

  fs.unlink(photoPath, (err) => {
    if (err)
      return next(
        new AppError("Something went wrong while deleting review", 500)
      );
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
