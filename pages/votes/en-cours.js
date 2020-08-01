import Head from 'next/head'
import Layout from 'components/Layout'
import { Box, Grid, Typography} from '@material-ui/core'
import VotesList from 'components/VotesList'
import { useUser } from 'utils/hooks'

const VoteEnCours = () => {
  const user = useUser({redirectTo:"/signin"})
  if (user != undefined && user == null) return <div></div>
  
  return (
    <>
      <Head><title>Next-Vote | Les votes en cours</title></Head>
      <Layout>
          <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Les votes en cours
            </Typography>
          </Box>
          <Box>
          <Grid container justify="center" spacing={2}>
            { user != undefined && user != null && 
              <VotesList filter="/en-cours"/> 
            }
          </Grid>
        </Box>
      </Layout>
    </>
  )
}

export default  VoteEnCours
