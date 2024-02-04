const express = require("express");
const viewsControllers = require("./../controllers/viewsControllers");
const router = express.Router();

router.get("/", viewsControllers.getOverview);
router.get("/tour/:slug", viewsControllers.getTour);
router.get("/login", viewsControllers.getLoginForm);

module.exports = router;
