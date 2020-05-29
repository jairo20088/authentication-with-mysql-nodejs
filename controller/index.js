const Blog = require("../modal/blog");
const User = require("../modal/user");

exports.getHomepage = (req, res, next) => {
  res.render("homepage");
};

exports.getBlog = (req, res, next) => {
  Blog.findAll()
    .then(result => {
      res.render("blog", { posts: result });
    })
    .catch(err => console.log(err));
};
exports.postBlog = (req, res, next) => {
  User.findByPk(req.session.user.id)
    .then(user => {
      return user
        .createBlog({
          title: req.body.title,
          text: req.body.text
        })
        .then(result => {
          res.redirect("/blog");
        });
    })
    .catch(err => console.log("nt found"));

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
