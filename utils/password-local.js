import Local from 'passport-local'
// import { findUser } from './user'
import userController from 'controllers/userController'

export const localStrategy = new Local.Strategy({
  usernameField: 'email', passwordField: 'password'},
  function (email,password, done ) {
  
  
  userController.loginRequest({ email, password })
    .then((user) => {
      if (!user.data) return done(user.errorMsg)
      done(null, user.data)
    })
    .catch((error) => {
      done(error)
    })
})