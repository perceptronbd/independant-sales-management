export const checkRole = async (req, res, next) => {
  const { role } = req.body;
  if (role === "user" || role === "agent") {
    return res.status(401).json({ error: "Unauthorized!" });
  }
  next();
};
