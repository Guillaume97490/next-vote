import Layout from 'components/Layout'
import {Box, Grid } from '@material-ui/core'
import { useUser } from 'utils/hooks'
import VotesList from 'components/VotesList'

const VoteTermines = () => {
  const user = useUser({redirectTo:"/signin"})
  if (user != undefined && user == null) return <div></div>

  return (
    <Layout title="Les votes terminés">
      <Box my={4}>
        <Grid container justify="center" spacing={2}>
          { user != undefined && user != null && 
            <VotesList filter="/termines"/> 
          }
        </Grid>
      </Box>
    </Layout>
  )
}

export default VoteTermines