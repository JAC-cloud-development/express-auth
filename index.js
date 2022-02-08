import express from 'express'
import jwt from 'jsonwebtoken'

const app = express()
const port = 3000

app.post('/login', (req, res) => {
  console.log(req.headers)
  const decoded = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString('binary')
  console.log({ decoded })
  /*
  jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  data: 'foobar'
}, 'secret');
  */
  res.send('Hello World!')
})


app.post('/jwt', (req, res) => {
  console.log(req.headers)
  //var decoded = jwt.verify(req.headers.authorization.split(" ")[1], 'wrong-secret');
  try {
    var decoded = jwt.verify(req.headers.authorization.split(" ")[1], 'secret');
    console.log({ decoded })
    res.send('Hello World!')
  } catch (e) {
    res.send(e)
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})