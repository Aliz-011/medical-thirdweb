export default async function user(req, res) {
  const { jwt } = req.headers;

  if (!jwt) {
    return res.status(404).send(null);
  }

  return res.json({ jwt });
}
