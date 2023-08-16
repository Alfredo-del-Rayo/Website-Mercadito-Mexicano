module.exports = function scrollToBottomView(req, res, next) {
    const email = req.body.email;
    res.locals.scrollToBottomView = true;
    next();
  };