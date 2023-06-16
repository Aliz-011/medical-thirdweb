import { NextApiRequest, NextApiResponse } from 'next';
import initializeFirebaseServer from '../../../lib/initFirebaseAdmin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Get the user off the request
  const firebase = initializeFirebaseServer();
  const user = await firebase.auth.getUser(req);

  // Check if the user is authenticated
  if (!user) {
    return res.status(401).json({
      message: 'Not authorized.',
    });
  }

  // Return a protected resource to the authenticated user
  return res.status(200).json({
    message: `This is a secret for ${user.address}.`,
  });
};
