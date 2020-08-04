import userController from "controllers/userController"

export default async (req, res) => {
  const { method } = req

  switch (method) {
    // case 'GET':
    //   const users = await userController.list()
    //   res.json(users)
      
    //   break;

    case 'POST':
      const {email, password} = JSON.parse(req.body)
      if (!email ||!password) return res.status(400).json({errMsg: "Données manquante"})
      const user = await userController.LoginRequest({email, password})
      res.status(200).json({success: true, data: {email, password}})
      break;

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break;
  }
}