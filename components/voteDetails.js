import {Box, Button, CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup, Typography} from '@material-ui/core';
import { useState } from 'react';
import Link from 'src/Link'

import HowToVoteIcon from '@material-ui/icons/HowToVote';
import QueueIcon from '@material-ui/icons/Queue';
import PersonIcon from '@material-ui/icons/Person';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useUser, useVote, useResult } from 'utils/hooks'
import { mutate } from 'swr'
import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import { Skeleton } from '@material-ui/lab'


export default function VoteDetail({voteId}) {
  const user = useUser({redirectTo:"/signin"})
  const { vote, isLoading } = useVote(voteId)
  const [loadingParticipate, setLoadingParticipate] = useState(false);
  const [loadingVoting, setLoadingVoting] = useState(false);

  
  async function handleSubmit(voteId, e) {
    e.preventDefault()
    const choice = document.querySelector("[name='choice']:checked").value
    
    setLoadingVoting(true)
    const res = await fetch(`/api/votes/${voteId}/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({choice})
    })

    const result = await res.text()
    const {vote} = JSON.parse(result)
    if (vote.success) {
      mutate(`/api/votes/${voteId}`)
    } else {
      setLoadingVoting(false)
    }

  }

  const useStyles = makeStyles((theme) => ({
    btnMinus: {
      color: red[500]
    },
    btnPlus: {
      color: green[500]
    },
    btnIcon: {
      fontSize: '2.5rem'
    },
    textFieldQuota: {
      textAlign: 'center',
    },
    margin: {
      marginBottom: '1.4rem',
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    
  }))
  const classes = useStyles();

  async function handleParticipate(voteId, e) {
    e.preventDefault()
    try {
      setLoadingParticipate(true)
      const res = await fetch(`/api/votes/${voteId}/participate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({voteId})
      })
      const result = await res.text()
      const {vote} = JSON.parse(result)
      console.log("vote res req",vote);
      if (vote.success) {
        mutate(`/api/votes/${voteId}`)
      }
      
    } catch (error) {
      setLoadingParticipate(false)
      // console.log(error);
    }
  }

  const Created = () => (
    <>
      <Box fontWeight="fontWeightMedium" display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h6" align="center" component="h2">
          Participant : {' '}
          {vote.data.participants.length}/{vote.data.quota}
        </Typography>
          <PersonIcon/>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="center" my={5}>
        {vote.data.choices.map((choice, i) => (
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
      
      {!vote.data.participants.includes(user?._doc?._id) ? 
        <form onSubmit={(e)=> handleParticipate(vote.data._id, e)} noValidate>
          {console.log(user.id)}
          <Box align="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loadingParticipate}
              size="large"
              startIcon={<QueueIcon />}
            >
              Participer
              {loadingParticipate && <CircularProgress size={24} className={classes.buttonProgress} />}
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
    <form onSubmit={(e) => handleSubmit(vote.data._id, e)} noValidate>
        <Box display="flex" justifyContent="center" mb={5}>
          <FormControl component="fieldset">
            {/* <FormLabel component="legend">Un seul vote est autorisé</FormLabel> */}
            <Box mb="1rem" />
            
              <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <Box display="flex" flexWrap="wrap" justifyContent="center" my={5}>
                  {vote.data.choices.map((choice, i) => (
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
            

        {vote.hasVoted ? 
          <Typography color="primary" variant="h6" align="center" component="h2">
          Votre vote a été pris en compte
          </Typography>
        :
          <Box align="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loadingVoting}
              startIcon={<HowToVoteIcon />}
            >
              Voter
              {loadingVoting && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
          </Box>
        }
      </form>
  )


  const Finished = () => { 
    const {result, isLoading} = useResult(vote.data._id)
    console.log("result pour finish", result);
    return (
  <>
      <Typography variant="h6" align="center" component="h2">
        Ce vote est terminer
      </Typography>
      <Box my={3}/>

      {result && !isLoading && 
        <>
          <Typography variant="h5" align="center" component="h3">
            Resultat : 
          </Typography>
          <Box my={2}>
            {Object.entries(result.result).map(e => 
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
    
  }


  return (
    
    <>
      {isLoading ? 
      <>
        <Box mb={15}>
          <Typography variant="h4" align="center" component="h1" gutterBottom>
            <Skeleton style={{margin:"auto"}} animation="wave" variant="rect" width="20%" height={41} />
          </Typography>
        </Box>
        <Box mb={15}>
          <Typography variant="h4" align="center" component="h1" gutterBottom>
            <Skeleton style={{margin:"auto"}} animation="wave" variant="rect" width="25%" height={60} />
          </Typography>
        </Box>

        <Box mb={15}>
          <Typography variant="h4" align="center" component="h1" gutterBottom>
            <Skeleton style={{margin:"auto"}} animation="wave" variant="rect" width="15%" height={40} />
          </Typography>
        </Box>
      </>
      :
      <>
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          {vote.data.subject}
        </Typography>
        <Box mb="3rem" />
        {vote.data.status === "created" && 
          <Created />
        }

        {vote.data.status === "inprogress" && 
          <InProgress />
        }

        {vote.data.status === "finished" && 
          <Finished />
          
        }
      </> 
      }

    </>
  )
}