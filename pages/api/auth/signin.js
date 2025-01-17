import passport from 'passport'
import nextConnect from 'next-connect'
import { localStrategy } from 'utils/password-local'
import { encryptSession } from 'utils/iron'
import { setTokenCookie } from 'utils/auth-cookies'

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

passport.use(localStrategy)

export default nextConnect()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate('local', req, res)
      // session is the payload to save in the token, it may contain basic info about the user
      const session = { ...user }
      // The token is a string with the encrypted session
      const token = await encryptSession(session)

      setTokenCookie(res, token)
      res.status(200).send({ done: true })
    } catch (error) {
      // console.error(error)
      res.status(401).json(error.message || {errorMsg: error})
    }
  })