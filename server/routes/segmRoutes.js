const express = require("express");
const router = express.Router();
const segm = require("../controllers/segm.controller");
const upload = require("../utils/storage");


/* GET picture. */
router.get("/picture", segm.get);

/* POST image segemntation */
router.post("/upload", upload.single("file"), segm.upload);

module.exports = router;

