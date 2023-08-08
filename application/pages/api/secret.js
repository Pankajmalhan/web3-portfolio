import { getUser } from "./auth/[...thirdweb]";

const handler = async (req, res) => {
  // Get the user of the request
  const user = await getUser(req);

  // Check if the user is authenticated
  if (!user) {
    return res.status(401).json({
      message: "No user is signed in.",
    });
  }

  // Return the secret message to the authenticated user
  return res.status(200).json({
    message: `${user.address}`,
  });
};

export default handler;
