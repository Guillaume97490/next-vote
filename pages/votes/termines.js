import Head from 'next/head'
import Layout from 'components/Layout'
import {Box, Grid ,Typography} from '@material-ui/core'
import { useUser } from 'utils/hooks'
import VotesList from 'components/VotesList'

const VoteTermines = () => {
  const user = useUser({redirectTo:"/signin"})
  if (user != undefined && user == null) return <div></div>

  return (
    <>
      <Head><title>Next-Vote | Les votes terminés</title></Head>
      <Layout>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Les votes terminés
          </Typography>
        </Box>
        <Box>
          <Grid container justify="center" spacing={2}>
            { user != undefined && user != null && 
              <VotesList filter="/termines"/> 
            }
          </Grid>
        </Box>
      </Layout>
    </>
  )
}

export default VoteTermines