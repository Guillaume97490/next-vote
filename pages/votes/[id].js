import Head from 'next/head';
import VoteDetail from 'components/voteDetails'
import Box from '@material-ui/core/Box';
import { getSession } from 'utils/iron'
import useSWR from 'swr'
import voteController from 'controllers/voteController'
import Layout from 'components/Layout';


export async function getServerSideProps({params, req, res}) {
  const session = await getSession(req)
  let user = null
  if (!session && res) {
    res.writeHead(301, {
      Location: '/signin'
    })
    res.end()
    return { props: {} }
  }
  
  user = {
    id: session._doc._id,
    login: session._doc.login
  }

  const {id} = params
  const {data, hasVoted} = await voteController.getOne(id, user.id)

  if (!data) return { props: { vote:null } }
  const vote = {
    _id : data._id.toString(),
    subject: data.subject,
    choices: data.choices,
    quota: data.quota,
    nbVote: data.nbVote ? data.nbVote : 0,
    status: data.status,
    participants : data.participants.toString().split(','),
    createdBy : {
      _id : data.createdBy._id.toString(),
      login: data.createdBy.login.toString()
    },
  }
  vote.participants = vote.participants[0] === '' ? [] : vote.participants

  const { result } = await voteController.result(id)
  
  
  return { props: { vote, user, hasVoted, id, result } }
}

const fetcher = (...args) => fetch(...args).then(res => res.json())
function useVote (id, init) {
  const { data, error } = useSWR(`/api/votes/${id}`, fetcher, {initialData:init})
  return {
    vote2: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default function ShowVote({vote, user, hasVoted, id, result}) {
  let { vote2, isLoading, isError } = useVote(id, vote)
  if (vote2.data) vote2 = vote2.data

  // if (isLoading) return(
  //   <>
  //     <Head><title>Next-Vote</title></Head>
  //     <Box my={4}>
  //       <div>loading ......................</div>
  //     </Box>
  //   </>
  // )
  return (
    <>
      <Head><title>Next-Vote</title></Head>
      <Layout>
        <Box my={4}>
        {/* {vote2.data._id} */}
        {/* {vote2.data.participants.length} */}

        <VoteDetail 
          vote={vote} 
          user={user} 
          hasVoted={hasVoted} 
          id={id}
          result={result}
        />
      </Box>
      </Layout>
    </>
  )
}