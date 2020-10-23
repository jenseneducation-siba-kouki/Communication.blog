const express = require("express");
const router = express.Router();
const { auth } = require("./verifyUser");


router.get("/", (req, res) => res.render("pages/index"));
router.get("/signup", (req, res) => res.render("pages/signup"));
router.get("/login", (req, res) => res.render("pages/login"));
router.get("/dashboard", auth, (req, res) =>
  res.render("pages/dashboard", { user: req.user })
);
router.get("/create", auth, (req, res) =>
  res.render("pages/create", { user: req.user })
);

module.exports = router;
