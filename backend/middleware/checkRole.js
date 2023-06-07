//Middleware to verify the role of the user and redirect to the correct page
export const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.redirect("/");
    }
    next();
  };
};
