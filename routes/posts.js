const express = require("express");
const router = express.Router();
const {
  create,
  getAll,
  getOnePost,
  updatePost,
  deletePost,
} = require("../models/Blog");
const { auth } = require("./verifyUser");

router.get("/", auth, async (req, res) => {
  const blogs = await getAll(req.user, req.user.userID);
  if (blogs) {
    res.render("pages/posts", { user: req.user, blogs });
    return;
  }
  res.status(403);
});

router.post("/", auth, async (req, res) => {
  const blog = await create(req.body, req.user.userID);
  if (blog) {
    res.json(blog);
    return;
  }
  res.status(500);
});

router.get("/:id", auth, async (req, res) => {
  const blog = await getOnePost(req.params.id);
  if (blog) {
    res.render("pages/edit", { user: req.user, blog });
    return;
  }
  res.status(403);
});

router.post("/:id", auth, async (req, res) => {
  const blogs = await updatePost(req.body, req.params.id);
  if (blogs) {
    res.redirect("/api/posts");
    return;
  }
  res.status(403);
});

router.post("/delete/:id", auth, async (req, res) => {
  const blogs = await deletePost(req.params.id);
  if (blogs) {
    res.redirect("/api/posts");
    return;
  }
  res.status(403);
});

module.exports = router;
