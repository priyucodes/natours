/*eslint arrow-body-style: [2, "always"]*/
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
    // Both this and above means the same error       fn(req, res, next).catch((err) => next(err));
  };
};
