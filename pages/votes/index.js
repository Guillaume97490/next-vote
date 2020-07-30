import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import VoteCard from 'components/voteCard'
import Grid from '@material-ui/core/Grid'
import voteController from 'controllers/voteController'
import Head from 'next/head';
import { getSession } from 'utils/iron'
import Pagination from '@material-ui/lab/Pagination';
import { useRouter } from 'next/router'
import Layout from 'components/Layout';



export async function getServerSideProps({req, res, query}) {
  const session = await getSession(req)
  let user = null
  if (!session && res) {
    res.writeHead(301, {
      Location: '/signin'
    })
    res.end()
    return { props: {} }
  }
  
  user = {
    id: session._doc._id,
    login: session._doc.login
  }

  const currentPage = (typeof query.page !== "undefined" || query.page > 0 ) ? query.page : 1
  const pageNb = Math.max(0, currentPage);
  const perPage = 3
  const limit = perPage 
  const skip = perPage * pageNb - perPage
  
  const {data, total} = await voteController.list(limit, skip)
  if (!data) return { props: { votes:null } }
  const pages = Math.ceil(total / perPage)


  const votes = data.map((vote) => {
    vote._id = vote._id.toString()
    
    vote.participants = vote.participants.toString().split(',')
    vote.participants = vote.participants[0] === '' ? [] : vote.participants
    vote.createdBy = {
      _id : vote.createdBy._id.toString(),
      login: vote.createdBy.login.toString()
    }
    if (vote.created) vote.created = vote.created.toString()
    if (vote.modified) vote.modified = vote.modified.toString()
    
    return vote
  })

  // Pass data to the page via props
  return { props: { votes, user, pageNb, pages } }
}

  
const AllVotes = ({votes, user, pageNb, pages}) => {
  const router = useRouter()

  const [page, setPage] = useState(pageNb);
  const [totalPages, setTotalPages] = useState(pages)
  const [votesList, setVotesList] = useState(votes)


  const handlePageChange = async (event, value) => {
    const path = `/votes?page=${value}`
    setPage(value);
    const res = await fetch(`/api${path}`)
    const {data, total} = JSON.parse(await res.text())
    setVotesList(data)
    router.push(path, undefined, { shallow: true })
  };

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
            {votesList.map(vote => (
              <Grid key={vote._id} item xs={12} sm={6}>
                <VoteCard vote={vote} user={user} />
              </Grid>
            ))}
          </Grid>
          <Box mt={3}/>
          <Typography align="right">Page: {page}</Typography>
          <Box display="flex" justifyContent="center" my={2}>
            <Pagination align="center" count={totalPages} page={page} onChange={handlePageChange} />
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export default AllVotes
