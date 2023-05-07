import { verifyLogin } from '@thirdweb-dev/auth/evm';
import { createSupabaseServer } from '../../../lib/createSupabaseAdmin';

export default async function login(req, res) {
  const { payload, access_token } = req.body;

  // Use the Supabase service role to access the database with full permissions
  const supabase = createSupabaseServer();

  const domain = 'example.org';

  // Get the user from our database using the client side access token
  const {
    data: { user },
  } = await supabase.auth.getUser(access_token);

  // Verify that the signed login payload is valid
  const { address, error: verifyErr } = await verifyLogin(domain, payload);
  if (!address) {
    return res.status(400).json({ error: verifyErr });
  }

  // Update the user's address in our database
  const { data } = await supabase.auth.admin.updateUserById(user.id, {
    user_metadata: { address: address.toLowerCase() },
  });

  return res.status(200).json({ data }).end();
}
