import { User } from "../model/user.js";

export async function getUserSubtree(user) {
  console.log("Building subtree for user:", user);

  const name = `${user.firstName} ${user.lastName}`;
  console.log("User name:", name);

  const subtree = {
    id: user.id,
    name: name,
    email: user.email,
    role: user.role,
    refCode: user.refCode,
    linksTo: [],
  };

  const directChildren = await User.find({ referralID: user.refCode });
  console.log("Direct children:", directChildren);

  for (const child of directChildren) {
    console.log("Processing child:", child);

    const childSubtree = await getUserSubtree(child);
    console.log("Child subtree:", childSubtree);

    subtree.linksTo.push(childSubtree);
  }

  console.log("Final subtree:", subtree);

  return subtree;
}
