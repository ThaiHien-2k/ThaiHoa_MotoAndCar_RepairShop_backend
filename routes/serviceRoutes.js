const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

router.get("/services", serviceController.getServiceList);
router.post("/services", serviceController.createService);

module.exports = router;
