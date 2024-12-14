const express = require("express");
const {
  uploadPhotoMiddleware,
  resizePhotoMiddleware,
} = require("../../middlewares/uploadPhotoMiddleware");
const {
  addReviewController,
  getAllReviewsController,
  getReviewController,
  deleteReviewController,
} = require("../../controllers/reviewController");

const router = express.Router();

router
  .route("/")
  .post(
    uploadPhotoMiddleware(false),
    resizePhotoMiddleware("reviews"),
    addReviewController
  )
  .get(getAllReviewsController);

router.route("/:id").get(getReviewController).delete(deleteReviewController);

module.exports = router;
