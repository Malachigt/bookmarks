const express = require("express");
const bookmarkControl = require("../controllers/bookmarks");
const router = express.Router();
router.post("/", bookmarkControl.create);
router.get("/", bookmarkControl.getall);
router.delete("/", bookmarkControl.deleteBookmark);
router.patch("/",bookmarkControl.update);
module.exports = router;