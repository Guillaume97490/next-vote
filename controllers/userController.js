import dbConnect from 'utils/dbConnect'
import User from 'models/User'
import bcrypt from 'bcryptjs'
const userController = {}

userController.list = async () => {
  try {
    await dbConnect()
    const users = await User.find({}).sort({'_id': -1}).lean() /* find all the data in our database */
    return {success: true, data: users}
  } catch (error) {
    // console.log("error", error);
    return {success: false, error}
  }
}

userController.loginRequest = async ({email, password}) => {
  try {
    if (!email ||!password) return {success: false, errorMsg: 'Données manquante' }
    await dbConnect()
    const user = await User.findOne({email})
    if (!user) return {success: false, errorMsg: 'Identifiants invalide' }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) return {success: false, errorMsg: 'Identifiants invalide' }
    
    return {success: true, data: user}
  } catch (error) {
    return {success: false, errorMsg: error.message}
  }
}

userController.signUp = async ({ login, email, password }) => {
  try {
    const hashPass = await bcrypt.hash(password, 12);
    await dbConnect()
    const user = await User.create({ login, email, password:hashPass })
    return {success: true}
  } catch (error) {
    return {success: false, error}
  }
}


export default userController