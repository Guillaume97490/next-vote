import userController from 'controllers/userController'

export default async function signup(req, res) {
    const {success , error} = await userController.signUp(req.body)
    if ( success ) return res.status(200).send({ done: true })
    res.status(400).send({ done: false , error})
}