import Layout from 'components/Layout'
import { Box, Grid} from '@material-ui/core'
import VotesList from 'components/VotesList'
import { useUser } from 'utils/hooks'

const VoteEnCours = () => {
  const user = useUser({redirectTo:"/signin"})
  if (user != undefined && user == null) return <div></div>
  
  return (
    <Layout title="Les votes en cours">
        <Box my={4}>
        <Grid container justify="center" spacing={2}>
          { user != undefined && user != null && 
            <VotesList filter="/en-cours"/> 
          }
        </Grid>
      </Box>
    </Layout>
  )
}

export default  VoteEnCours
