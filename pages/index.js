import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import VoteCard from '../components/voteCard'
import Grid from '@material-ui/core/Grid'
import voteController from 'controllers/voteController'
import Head from 'next/head';
import { getSession } from 'utils/iron'
import Layout from 'components/Layout';


export async function getServerSideProps({req, res}) {
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
  

  const {data} = await voteController.list()
  if (!data) return { props: { votes:null } }
  const votes = data.map((vote) => {
    vote._id = vote._id.toString()
    // vote.participants = vote.participants.length
    
    vote.participants = vote.participants.toString().split(',')
    // if (vote.participants == []) vote.participants = null
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
  return { props: { votes, user } }
}

export default function Index({votes, user}) {
  
  return (
    <>
      <Head><title>Next-Vote</title></Head>
      <Layout>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next-Vote
          </Typography>
        </Box>
        <Box>
        <Grid container justify="center" spacing={2}>
          {votes.map(vote => (
            <Grid key={vote._id} item xs={12} sm={6}>
              <VoteCard vote={vote} user={user} />
            </Grid>
          ))}
        </Grid>
        </Box>
      </Layout>
    </>
  );
}
