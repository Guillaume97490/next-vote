import Head from 'next/head';
import Layout from 'components/Layout'
import {Box, Grid, Typography} from '@material-ui/core'
import VotesList from 'components/VotesList'
import { useUser } from 'utils/hooks'

const MesVote = () => {

  const user = useUser({redirectTo:"/signin"})
  if (user != undefined && user == null) return <div></div>

  return (
    <>
      <Head><title>Next-Vote | Mes votes</title></Head>
      <Layout>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Mes votes
          </Typography>
        </Box>
        <Box>
          <Grid container justify="center" spacing={2}>
          { user != undefined && user != null && 
          <VotesList filter="/mes-votes"/> 
          }
          </Grid>
        </Box>
      </Layout>
    </>
  )
}

export default MesVote
