import { useState } from 'react'
import { useRouter } from 'next/router'
import { useVotes, useUser } from 'utils/hooks'
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core'
import { Pagination, Skeleton } from '@material-ui/lab'
import VoteCard from 'components/voteCard'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    borderTop: 'solid #0000002b'
  },
});


const SqueletonCard = () => (
    <>
        <Box mb={2}>
            <Skeleton animation="wave" variant="rect" width={ramdomNumber()} height={23} />
        </Box>
        <Box mb={2}>
            <Skeleton animation="wave" variant="rect" width={ramdomNumber()} height={15} />
        </Box>
        <Box mb={2}>
            <Skeleton animation="wave" variant="rect" width="100%" height={5} />
        </Box>
        <Box>
            <Skeleton animation="wave" variant="rect" width={ramdomNumber()} height={20} />
        </Box>
    </>
)

const ramdomNumber = () => Math.floor((Math.random() * 100) + 1)+"%"

const VoteListe = ({filter}) => {
    // return null
    const classes = useStyles();

    const user = useUser({redirectTo:"/signin"})
    const queryPage = new URLSearchParams(location.search).get("page")
    const currentPage = (queryPage > 0 ) ? queryPage : 1
    const pageNb = Math.max(0, currentPage);
    const perPage = 4
    // const limit = perPage
    // const skip = perPage * pageNb - perPage

    const { votes, isLoading } = useVotes(filter ,currentPage)
    
    const [page, setPage] = useState(pageNb);
    
    const pages = Math.ceil(votes?.total / perPage)
    const router = useRouter()

    const handlePageChange = async (event, value) => {
    const path = `/votes${filter ? filter : ""}?page=${value}`
    setPage(value);
    router.push(path, undefined, { shallow: true })
  };

    return (
        <>
            {isLoading ?
            <>
                <Grid item xs={12} sm={6}>
                    <Box mb={3}>
                        <Card className={classes.root}>
                            <CardContent>
                                <SqueletonCard/>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box mb={3}>
                        <Card className={classes.root}>
                            <CardContent>
                                <SqueletonCard/>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box mb={3}>
                        <Card className={classes.root}>
                            <CardContent>
                                <SqueletonCard/>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box mb={3}>
                        <Card className={classes.root}>
                            <CardContent>
                                <SqueletonCard/>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </>
            :
            <>
                {votes.data.map(vote => (
                    <Grid key={vote._id} item xs={12} sm={6}>
                    <VoteCard vote={vote} user={user} />
                    </Grid>
                ))}

                <Box width="100%">
                    <Box mt={3} width="100%"/>

                    <Typography align="right" >Page: {page}</Typography>
                    <Box display="flex" justifyContent="center" my={2}>
                        <Pagination align="center" count={pages} page={page} onChange={handlePageChange} />
                    </Box>
                </Box>
            </>
            }
        </>
    )
}

export default VoteListe