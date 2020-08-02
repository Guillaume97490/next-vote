import Layout from 'components/Layout'
import {Box, Grid, Typography} from '@material-ui/core'
import Vote from '../public/images/vote.svg'

export default function Index() {
  
  return (
    <Layout>
      <Box my={4}>
        <Box align="center">
          <Vote height="100%" width="30%" />
          <Typography align="center" variant="inherit" component="h2" gutterBottom>
            L'application de vote en ligne
          </Typography>
        </Box>
        <Box p={3}/>
      </Box>
      <Box>
        <Grid container justify="center" spacing={2} />
      </Box>
    </Layout>
  );
}
