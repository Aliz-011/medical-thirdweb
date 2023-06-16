import { verifyLogin } from '@thirdweb-dev/auth/evm';
import initializeFirebaseServer from '../../../lib/initFirebaseAdmin';

export default async function login(req, res) {
  const { payload } = req.body;

  const domain = 'example.org';

  const { address, error } = await verifyLogin(domain, payload);

  if (!address) return res.status(401).json({ error });

  const { auth } = initializeFirebaseServer();

  const token = await auth.createCustomToken(address);
  return res.status(200).json({ address, token });
}
