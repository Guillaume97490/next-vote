import voteControler from 'controllers/voteController'
import { sessionUserId } from 'utils/iron'

export default async (req, res) => {
  const { method } = req
  const { id } = req.query
  switch (method) {
    case 'POST':
      const userId = await sessionUserId(req)
      const vote = await voteControler.addPartipate(id, userId)
      res.json({vote})
      // res.end()
      break;
      
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break;
  }
}