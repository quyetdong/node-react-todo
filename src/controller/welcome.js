export default async function (req, res) {
  let a = 1;
  let b = 2;

  console.log('*** abc ', a + b);
  console.log('*** abc ', res.user);

  res.status(200).send('Welcome 🙌');
}
