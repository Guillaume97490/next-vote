import { Box, Grid } from '@material-ui/core'
import { useUser } from 'utils/hooks'
import Layout from 'components/Layout'
import VotesList from 'components/VotesList'

const AllVotes = () => {

  const user = useUser({redirectTo:"/signin"})
  if (user != undefined && user == null) return <div></div>
  
  return (
    <Layout title="Liste des votes">
      <Box my={4}>
        <Grid container justify="center" spacing={2}>
        { user != undefined && user != null && 
        <VotesList /> 
        }
        </Grid>
      </Box>
    </Layout>
  );
}

export default AllVotes
