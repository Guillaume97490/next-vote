import voteControler from 'controllers/voteController'
import { sessionUserId } from 'utils/iron'

export default async (req, res) => {
  const { method } = req
  const { id } = req.query
  const {choice} = req.body
  switch (method) {
    case 'POST':
      const userId = await sessionUserId(req)
      // console.log(userId);
      const vote = await voteControler.validateVote(id, userId, choice)
      res.json({vote})
      // res.end()
      break;

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break;
  }
}