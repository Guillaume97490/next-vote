import voteControler from 'controllers/voteController'
import { getSession } from 'utils/iron'

export default async (req, res, query) => {
  const { method } = req
  // var currentpage=(typeof req.params.page!="undefined" || req.params.page>0) ? req.params.page : 0

  switch (method) {
    case 'GET':
      const currentPage = (typeof req.query.page !== "undefined" || req.query.page > 0 ) ? req.query.page : 1
      const pageNb = Math.max(0, currentPage);
      const perPage = 3
      const limit = perPage 
      const skip = perPage * pageNb - perPage

      let filter = {}
      if (req.query.inprogress) filter = {status: 'inprogress'}
      if (req.query.finished) filter = {status: 'finished'}
      if (req.query.createdBy) {
        const session = await getSession(req)
        const userId = session.$__._id
        filter = {createdBy: userId}
      }

      const votes = await voteControler.list(limit, skip, filter)
      res.json({data: votes.data, total:votes.total})
      break;
    case 'POST':
      const session = await getSession(req)
      const userId = session.$__._id
      const {subject, quota, choices} = req.body
      const createdBy = userId
      const voteData = {subject, quota, choices, createdBy}
      const vote = await voteControler.create(voteData)

      res.status(vote.success ? 201 : 400).json(vote)
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break;
  }
}
