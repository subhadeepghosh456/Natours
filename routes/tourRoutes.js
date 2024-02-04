const express = require("express");
const tourControllers = require("../controllers/tourControllers");
const authController = require("./../controllers/authController");
// const reviewController = require("./../controllers/reviewController");
const reviewRouter = require("./../routes/reviewRoutes");
const router = express.Router();

// router.param("id", tourControllers.checkID);

// router
//   .route("/:tourId/reviews")
//   .post(
//     authController.protect,
//     authController.restrictTo("user"),
//     reviewController.createReview
//   );

router.use("/:tourId/reviews", reviewRouter);

router
  .route("/top-5-cheap")
  .get(tourControllers.aliasTopTours, tourControllers.getAllTour);
router.route("/tour-stats").get(tourControllers.getTourStates);
router
  .route("/monthly-plan/:year")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    tourControllers.getMonthlyPlan
  );
///api/v1/tours-within/400/center/34.111745,-118.113491/unit/mi
router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(tourControllers.getToursWithin);

router.route("/distances/:latlng/unit/:unit").get(tourControllers.getDistances);

router
  .route("/")
  .get(tourControllers.getAllTour)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourControllers.createTour
  );
router
  .route("/:id")
  .get(tourControllers.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourControllers.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourControllers.deleteTour
  );

module.exports = router;
