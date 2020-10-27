const DataStore = require("nedb-promise");
const blogs = new DataStore({ filename: "./db/blogs.db", autoload: true });
module.exports = {
  async getAll(user, userID) {
    if (user.role == "user") {
      return await blogs.find({ owner: userID });
    }
    return await blogs.find({});
  },

  async create(body, userID) {
    if (body.title == "" || body.content == "") return;
    const newBlog = await blogs.insert({
      title: body.title,
      content: body.content,
      owner: userID,
    });
    return {
      title: newBlog.title,
      content: newBlog.content,
    };
  },

  async getOnePost(postID) {
    return await blogs.findOne({ _id: postID });
  },

  async updatePost(body, postID) {
    if (body.title == "" || body.content == "") return;
    let post = await blogs.findOne({ _id: postID });
    post = await blogs.update(post, {
      $set: body,
    });
    return post;
  },

  async deletePost(postID) {
    return await blogs.remove({ _id: postID });
  },
};
