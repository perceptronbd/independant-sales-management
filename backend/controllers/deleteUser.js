import { User } from "../model/user.js";

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("req.user: ", req.user);
    console.log("userId: ", userId);
    if (req.user.role === "manager") {
      const result = await User.deleteOne({ _id: userId });
      if (result.deletedCount === 1) {
        return res.status(200).json("User has been deleted!");
      } else {
        return res.status(404).json("User not found.");
      }
    } else {
      res.status(403).json("Unauthorized request!");
    }
  } catch (error) {
    console.error("Error in deleteUser controller: ", error);
  }
};
