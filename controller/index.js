exports.getHomepage = (req, res, next) => {
  res.render("homepage");
  console.log(req.session);
};
exports.getBlog = (req, res, next) => {
  res.render("blog");
};
