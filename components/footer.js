import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import Box from '@material-ui/core/Box';


function Copyright() {
  return (
    <>
      <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        <Link color="inherit" href="/">
          Next Vote
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>

      <Typography variant="body2" color="textSecondary">
        <Box component="span" mt={1} display="flex" justifyContent="center" alignItems="center">
          <Box component="span" mr={1}>
            <GitHubIcon /> 
          </Box>
          <Link target="_blank" 
          color="inherit" 
          href="https://guillaume97490.github.io/"
          >
            Guillaume97490
          </Link> 

        </Box>
      </Typography>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
    <Container align="center" maxWidth="sm">
      {/* <Typography variant="body1">My sticky footer can be found here.</Typography> */}
      <Copyright />
    </Container>
    </footer>
  );
}