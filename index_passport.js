import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
const app = express()
const port = 3000

passport.use(new BasicStrategy(
  function (username, password, done) {
    console.log({ username, password })
    return done(null, { username, password });
  }
));

app.post('/login',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    console.log(req.user)
    /*
    jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: 'foobar'
  }, 'secret');
    */
    res.send('Hello World!')
  })

passport.use(new BearerStrategy(
  function (token, done) {
    console.log({ token })
    return done(null, { token, username:"test" });
  }
));

app.post('/jwt',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    console.log(req.headers)
    //var decoded = jwt.verify(req.headers.authorization.split(" ")[1], 'wrong-secret');
    res.json(req.user)

  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})