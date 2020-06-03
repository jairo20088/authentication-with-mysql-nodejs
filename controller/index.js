const Blog = require("../modal/blog");
const User = require("../modal/user");

exports.getHomepage = (req, res, next) => {
  Blog.findAll()
    .then(result => {
      res.render("homepage", { posts: result });
    })
    .catch(err => console.log(err));
};

exports.getBlog = (req, res, next) => {
  Blog.findAll({ where: { userId: req.session.user.id } })
    .then(result => {
      res.render("blog", { posts: result });
    })
    .catch(err => console.log(err));
};
exports.postBlog = (req, res, next) => {
  req.user
    .createBlog({
      title: req.body.title,
      text: req.body.text,
      name: req.session.user.name
    })
    .then(resul => {
      res.redirect("/blog");
      console.log(resul);
    })
    .catch(err => console.log(err));

  /* Blog.create({
    title: req.body.title,
    text: req.body.text
  }) */
};
exports.deletePost = (req, res, next) => {
  Blog.destroy({ where: { id: req.body.id } }).then(result => {
    res.redirect("/blog");
  });
};
