import React from 'react';
import { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert'; 
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Router from 'next/router'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
    marginTop: theme.spacing(3),
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
  authForm: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
}));



export default function SignUp() {

  const handleClickShowPassword = () => setShowPassword(!showPassword )

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [errorMsg, setErrorMsg] = useState('')
  const [errorLoginMsg, setErrorLoginMsg] = useState('')
  const [errorEmailMsg, setErrorEmailMsg] = useState('')
  const [errorPasswordMsg, setErrorPasswordMsg] = useState('')
  const [errorConditionMsg, setErrorConditionMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  async function handleChange(e) {
    
    if (e.currentTarget.id === 'login') {
      if (errorLoginMsg) setErrorLoginMsg('')
      if (!e.currentTarget.value) setErrorLoginMsg("Le nom d'utilisateur est obligatoire")
    }

    if (e.currentTarget.id === 'email') {
      if (errorEmailMsg) setErrorEmailMsg('')
      if (!e.currentTarget.value) setErrorEmailMsg("L'adresse email est obligatoire")
    }

    if (e.currentTarget.id === 'password') {
      if (errorPasswordMsg) setErrorPasswordMsg('')
      if (!e.currentTarget.value) setErrorPasswordMsg("Le mot de passe est obligatoire")
    }

    if (e.currentTarget.id === 'conditionCheckbox') {
      if (errorConditionMsg) setErrorConditionMsg('')
      if (!e.currentTarget.checked) setErrorConditionMsg("Vous devez accepter les conditions")
    }
    
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (errorMsg) setErrorMsg('')
    if (errorLoginMsg) setErrorLoginMsg('')
    if (errorEmailMsg) setErrorEmailMsg('')
    if (errorPasswordMsg) setErrorPasswordMsg('')
    if (errorConditionMsg) setErrorConditionMsg('')

    const body = {
      login: e.currentTarget.login.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      condition: e.currentTarget.conditionCheckbox.checked
    }

    if (!body.password || !body.login || !body.email || !body.condition ) {
      setErrorMsg('Tous les champs sont requis')
      if (!body.login) setErrorLoginMsg("Le nom d'utilisateur est obligatoire")
      if (!body.email) setErrorEmailMsg("L'adresse email est obligatoire")
      if (!body.password) setErrorPasswordMsg("Le mot de passe est obligatoire")
      if (!body.condition) setErrorConditionMsg("Vous devez accepter les conditions")

      return

      
    } 
    
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (res.status === 200) {
        Router.push('/signin')
        return
      } else {

      }
      const result = JSON.parse(await res.text())
      if (result.error && result.error.errors) {
        const fields = result.error.errors
        if (fields.login) {
          const errorText = `Le nom d'utilisateur ${fields.login.properties.message}.`
          setErrorMsg(errorText)
        }

        if (fields.email) {
          const errorText = `L'addresse email ${fields.email.properties.message}.`
          setErrorMsg(errorText) 
        }
        
      }
    } catch (error) {
      
    }
  }


  const classes = useStyles();

  return (
    <Container className={classes.authForm} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inscription
        </Typography>

        {errorMsg && 
          <Box mt={2} className={classes.alert}>
            <Alert severity="error">
              {errorMsg}       
            </Alert>
          </Box>
        }
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField onChange={handleChange}
                autoComplete="login"
                name="login"
                variant="outlined"
                required
                fullWidth
                id="login"
                label="Nom d'utilisateur"
                autoFocus
                error={errorLoginMsg ? true : false}
                helperText={errorLoginMsg ? errorLoginMsg : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Adresse email"
                name="email"
                autoComplete="email"
                error={errorEmailMsg ? true : false}
                helperText={errorEmailMsg ? errorEmailMsg : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={handleChange}
                variant="outlined"
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
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>,
                }}
                helperText={errorPasswordMsg ? errorPasswordMsg : ''}
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl required error component="fieldset" className={classes.formControl}>
              <FormControlLabel
                control={<Checkbox onChange={handleChange} id="conditionCheckbox" value="acceptConditions" color="primary" />}
                label="J'accepte les conditions d'utilisations"
              />
              {errorConditionMsg && 
                <FormHelperText>{errorConditionMsg}</FormHelperText>
              }
            </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Inscription
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Déja inscrit ? connectez-vous
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}