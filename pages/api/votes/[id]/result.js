import voteControler from 'controllers/voteController'
import { getSession } from 'utils/iron'


export default async (req, res) => {
  const { method } = req
  const { id } = req.query
  const session = await getSession(req)
  const user = {
    id: session._doc._id,
    login: session._doc.login
  }
  let vote = {}
  switch (method) {
    case 'GET':
      
      vote = await voteControler.result(id)
      res.json(vote)

      break;
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break;
  }
}