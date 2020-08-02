import Head from 'next/head';
import VoteDetail from 'components/voteDetails'
import Box from '@material-ui/core/Box';
import Layout from 'components/Layout';
import { useUser } from 'utils/hooks'
import { useRouter } from 'next/router'



const ShowVote = () => {
  const user = useUser({redirectTo:"/signin"})
  if (user != undefined && user == null) return <div></div>
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout>
      <Box my={4}>
      { user != undefined && user != null && 
        <VoteDetail voteId={id}/> 
      }
      </Box>
    </Layout>
  )
}

export default ShowVote