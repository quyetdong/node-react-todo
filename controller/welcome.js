export default async function (req, res) {
  console.log('*** abc ', res.user)
  res.status(200).send('Welcome 🙌');
}
