import Head from 'next/head'
import { Box, Grid, Typography } from '@material-ui/core'
import { useUser } from 'utils/hooks'
import Layout from 'components/Layout'
import VotesList from 'components/VotesList'

const AllVotes = () => {

  const user = useUser({redirectTo:"/signin"})
  if (user != undefined && user == null) return <div></div>
  
  return (
    <>
      <Head><title>Next-Vote | Tout les votes</title></Head>
      <Layout>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Liste des votes
          </Typography>
        </Box>
        <Box>
          <Grid container justify="center" spacing={2}>
          { user != undefined && user != null && 
          <VotesList /> 
          }
          </Grid>
        </Box>
      </Layout>
    </>
  );
}

export default AllVotes
