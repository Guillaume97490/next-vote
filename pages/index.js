import Head from 'next/head'
import Layout from 'components/Layout'
import {Box, Grid, Typography} from '@material-ui/core'
import Vote from '../public/images/vote.svg'

export default function Index() {
  
  return (
    <>
      <Head><title>Next-Vote</title></Head>
      <Layout>
        <Box my={4}>
          {/* <Typography variant="h4" component="h1" gutterBottom>
            Next-Vote
          </Typography> */}
          <Box align="center">
            <Vote height="100%" width="30%" />
            <Typography align="center" variant="inherit" component="h2" gutterBottom>
              L'application de vote en ligne
            </Typography>
          </Box>
            <Box  p={3}>
              
              
            </Box>
        </Box>
        <Box>
        <Grid container justify="center" spacing={2}>
        
        </Grid>
        </Box>
      </Layout>
    </>
  );
}
