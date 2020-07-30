import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import HowToVoteIcon from '@material-ui/icons/HowToVote';


const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    borderTop: 'solid #556cd6'
  },
});

export default function VoteCard({vote, user}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <a className="notd" href={"/votes/"+vote._id} >
          <style jsx>{`
            .notd{
              text-decoration: none
            }
          `}</style>
        <CardContent>
          <Box color="text.secondary">
            <Typography gutterBottom noWrap variant="h6" component="h2">
              {vote.subject}
            </Typography>
          </Box>
          <Typography variant="body2" noWrap color="textPrimary" component="p">
            {vote.createdBy.login && 
              `de ${vote.createdBy.login}`
            }
          </Typography>
          <Box my={1}>
            <LinearProgress 
              variant="determinate" 
              color="primary" 
              value={vote.participants.length / vote.quota * 100} 
            />
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <Typography component="p" color="textSecondary" variant="body2">
                {vote.participants.length} / {vote.quota}
              </Typography>
              
              <Typography component="p" color="textSecondary" variant="body2">
                <GroupIcon/>
              </Typography>
              
            </Box>
            {vote.createdBy._id === user.id && vote.status === 'finished' &&
              <Box display="flex" alignItems="center">
                <Typography component="p" color="textSecondary" variant="body2">
                {vote.nbVote} / {vote.quota}
                </Typography>

                <Typography component="p" color="textSecondary" variant="body2">
                  <HowToVoteIcon/>
                </Typography>
              </Box>

            }

          </Box>
        </CardContent>
        </a>
      </CardActionArea>
    </Card>
  );
}
