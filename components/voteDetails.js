import {Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography} from '@material-ui/core';
import { useState } from 'react';
import Link from 'src/Link'

import HowToVoteIcon from '@material-ui/icons/HowToVote';
import QueueIcon from '@material-ui/icons/Queue';
import PersonIcon from '@material-ui/icons/Person';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

export default function VoteDetail({vote, user = null, hasVoted, result}) {
  const [voteStatus, setVoteStatus] = useState(vote.status);
  const [hasParticipate, setHasParticipate] = useState(!vote.participants.includes(user.id) ? false : true)
  const [nbParticipants, setNbParticipants] = useState(vote.participants.length)
  const [userHasVoted, setUserHasVoted] = useState(hasVoted)


async function handleSubmit(voteId, e) {
  e.preventDefault()
  const choice = document.querySelector("[name='choice']:checked").value
  
  const res = await fetch(`/api/votes/${voteId}/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({choice})
  })

  const result = await res.text()
  const {vote} = JSON.parse(result)
  if (vote.success) {
    setVoteStatus(vote.data.status)
    setHasParticipate(vote.data.participants.includes(user.id))
    setNbParticipants(vote.data.participants.length)
    setUserHasVoted(true)
  }

}

async function handleParticipate(voteId, e) {
  e.preventDefault()
  try {
    const res = await fetch(`/api/votes/${voteId}/participate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({voteId})
    })
    const result = await res.text()
    const {vote} = JSON.parse(result)
    if (vote.success) {
      setVoteStatus(vote.data.status)
      setHasParticipate(vote.data.participants.includes(user.id))
      setNbParticipants(vote.data.participants.length)
    }
    
  } catch (error) {
    // console.log(error);
  }
}

const Created = () => (
  <>
    <Box fontWeight="fontWeightMedium" display="flex" alignItems="center" justifyContent="center">
      <Typography variant="h6" align="center" component="h2">
        Participant : {' '}
        {nbParticipants}/{vote.quota}
      </Typography>
        <PersonIcon/>
    </Box>
    <Box display="flex" flexWrap="wrap" justifyContent="center" my={5}>
      {vote.choices.map((choice, i) => (
        <FormControlLabel
        key={i}
        value={choice}
        disabled
        control={<Radio color="primary" />}
        label={choice}
        labelPlacement="bottom"
        />
      ))}
    </Box>

    {!hasParticipate ? 
      <form onSubmit={(e)=> handleParticipate(vote._id, e)} noValidate>
        <Box align="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<QueueIcon />}
          >
            Participer
          </Button>
        </Box>
      </form>
    : 
      <Typography color="primary" variant="h6" align="center" component="h2">
        Vous participé à ce vote
      </Typography>
    }

  </>
)


const InProgress = () => (
  <form onSubmit={(e) => handleSubmit(vote._id, e)} noValidate>
      <Box display="flex" justifyContent="center" mb={5}>
        <FormControl component="fieldset">
          {/* <FormLabel component="legend">Un seul vote est autorisé</FormLabel> */}
          <Box mb="1rem" />
          
            <RadioGroup row aria-label="position" name="position" defaultValue="top">
              <Box display="flex" flexWrap="wrap" justifyContent="center" my={5}>
                {vote.choices.map((choice, i) => (
                  <FormControlLabel
                  key={i}
                  value={choice}
                  control={<Radio name="choice" color="primary" />}
                  label={choice}
                  labelPlacement="bottom"
                  />
                ))}
              </Box>
            </RadioGroup>
        </FormControl>
      </Box>
          

      {userHasVoted ? 
        <Typography color="primary" variant="h6" align="center" component="h2">
        Vous avez déja voté
        </Typography>
      :
        <Box align="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HowToVoteIcon />}
          >
            Voter
          </Button>
        </Box>
      }
     </form>
)


const Finished = () => (
  
  <>
    <Typography variant="h6" align="center" component="h2">
      Ce vote est terminer
    </Typography>
    <Box my={3}/>

    {result && 
      <>
        <Typography variant="h5" align="center" component="h3">
          Resultat : 
        </Typography>
        <Box my={2}>
          {Object.entries(result).map(e => 
            <Typography key={e[0]} variant="h5" align="center" component="h3">
              <div>
                {e[0]} : {e[1]}
              </div>
            </Typography>
          )}
        </Box>
      </>
    }

    <Box align="center">
      <Link href="/votes">
        <Button
          type="button"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<KeyboardBackspaceIcon />}
        >
          Retour
        </Button>
      </Link>
    </Box>
    
  </>
)


  return (
    <>
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        {vote.subject}
      </Typography>
     <Box mb="3rem" />

      {voteStatus === "created" && 
        <Created />
      }

      {voteStatus === "inprogress" && 
        <InProgress />
      }

      {voteStatus === "finished" && 
        <Finished />
      }
    </>
  )
}