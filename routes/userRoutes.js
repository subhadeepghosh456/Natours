const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");
const authControllers = require("./../controllers/authController");

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);

router.post("/forgotPassword", authControllers.forgotPassword);
router.patch("/resetPassword/:token", authControllers.resetPassword);

router.use(authControllers.protect);

router.get(
  "/me",

  userControllers.getMe,
  userControllers.getUser
);
router.patch("/updateMe", userControllers.updateMe);
router.delete("/deleteMe", userControllers.deleteMe);
router.patch("/updateMyPassword", authControllers.updatePassword);

router.use(authControllers.restrictTo("admin"));

router
  .route("/")
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);

router
  .route("/:id")
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
