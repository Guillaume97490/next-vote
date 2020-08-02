import Layout from 'components/Layout'
import {Box, Grid } from '@material-ui/core'
import VotesList from 'components/VotesList'
import { useUser } from 'utils/hooks'

const MesVote = () => {
  const user = useUser({redirectTo:"/signin"})
  if (user != undefined && user == null) return <div></div>

  return (
    <Layout title="Mes votes">
      <Box my={4}>
        <Grid container justify="center" spacing={2}>
        { user != undefined && user != null && 
        <VotesList filter="/mes-votes"/> 
        }
        </Grid>
      </Box>
    </Layout>
  )
}

export default MesVote
