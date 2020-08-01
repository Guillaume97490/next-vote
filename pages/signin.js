import { useState } from 'react'
import Head from 'next/head';
import {Avatar, Box, Button, CircularProgress, Container, CssBaseline, InputAdornment,
  Grid, Link, Typography, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert'; 
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
import { useRouter } from 'next/router'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useUser } from 'utils/hooks'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'© '}
      <Link color="inherit" href="/">
        Next-Votes
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  authForm: {
    position: 'absolute',
    left: 0,
    right: 0,
  }
}));

export default function SignIn() {
  const user = useUser({redirectTo:"/votes", redirectIfFound:true})
  if (user != undefined && user == null) return <div></div>

  const handleClickShowPassword = () => setShowPassword(!showPassword )

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const router = useRouter()
  const classes = useStyles();

  const [errorMsg, setErrorMsg] = useState('')
  const [errorEmailMsg, setErrorEmailMsg] = useState('')
  const [errorPasswordMsg, setErrorPasswordMsg] = useState('')
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  async function handleChange(e) {
    if (e.currentTarget.id === 'email') {
      if (errorEmailMsg) setErrorEmailMsg('')
      if (!e.currentTarget.value) setErrorEmailMsg("L'adresse email est obligatoire")
    }

    if (e.currentTarget.id === 'password') {
      if (errorPasswordMsg) setErrorPasswordMsg('')
      if (!e.currentTarget.value) setErrorPasswordMsg("Le mot de passe est obligatoire")
    }
  }


  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')
    if (errorEmailMsg) setErrorEmailMsg('')
    if (errorPasswordMsg) setErrorPasswordMsg('')

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value
    }

    if (!body.password || !body.email ) {
      setErrorMsg('Tous les champs sont requis')
      if (!body.email) setErrorEmailMsg("L'adresse email est obligatoire")
      if (!body.password) setErrorPasswordMsg("Le mot de passe est obligatoire")
      return
    }


    try {
      // setSuccess(false);
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (res.status === 200) {
          // setSuccess(true);  
          router.push('/')
          // setLoading(false);
      } else {
        const errorMsg = JSON.parse(await res.text()).errorMsg
        setErrorMsg(errorMsg)
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg("Un probleme est survenu")
      setLoading(false);
    }
    
  }

  return (
    
    <Container className={classes.authForm} component="main" maxWidth="xs">
      {user == undefined && user == null && 
        <>
          <Head><title>Connexion</title></Head>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Connexion
            </Typography>

            {errorMsg && 
              <Box mt={2} className={classes.alert}>
                <Alert severity="error">
                  {errorMsg}       
                </Alert>
              </Box>
            }

            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <TextField onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse email"
                name="email"
                autoComplete="email"
                autoFocus
                error={errorEmailMsg ? true : false}
                helperText={errorEmailMsg ? errorEmailMsg : ''}
              />
              <TextField onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                error={errorPasswordMsg ? true : false}
                InputProps={{
                  endAdornment: <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>,
                }}
                helperText={errorPasswordMsg ? errorPasswordMsg : ''}
              />





              <Box mt={2}></Box>
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Se rappeler de moi"
              /> */}
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                // className={classes.submit}
                className={buttonClassname}
                disabled={loading}
              >
                Connexion
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </Button>
              <Box mb={2}></Box>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Mot de passe oublié ?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Créer un compte"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </>
      }

    </Container>
  );
}