import { User } from "../model/user.js";

export async function getUserSubtree(user) {
  const name = `${user.firstName} ${user.lastName}`;
  const subtree = {
    id: user.id,
    name: name,
    email: user.email,
    role: user.role,
    refCode: user.refCode,
    linksTo: [],
  };

  const directChildren = await User.find({ referralID: user.refCode });

  for (const child of directChildren) {
    const childSubtree = await getUserSubtree(child);
    subtree.linksTo.push(childSubtree);
  }

  return subtree;
}
