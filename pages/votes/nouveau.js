
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import Layout from 'components/Layout';
import { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Hidden from '@material-ui/core/Hidden';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function NewVote() {
  const [quota, setQuota] = useState(1)
  const [subjetError, setSubjetError] = useState('')
  const [quotaError, setQuotaError] = useState('')
  const [choiceOneError, setChoiceOneError] = useState('')
  const [choiceTwoError, setChoiceTwoError] = useState('')
  const [choiceError, setChoiceError] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [additionalChoice, setAdditionalChoice] = useState([])
  const [successAlert, setSuccessAlert] = useState('')

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

  const handleQuotaMinus = () => {
    if (quotaError) setQuotaError('')
    quota > 1 ? setQuota(quota-1) : ''
  }

  const handleQuotaPlus = () => {
    if (quotaError) setQuotaError('')
    setQuota(quota+1)
  }

  const handleAddChoice = () => {
    let last = additionalChoice.length ? additionalChoice.slice(-1) : 0
    const newChoices = [...additionalChoice, Number(last) + 1 ]
    setAdditionalChoice(newChoices)
  }

  const handleRemoveChoice = (index) => setAdditionalChoice(additionalChoice.filter((_, i) => i !== index));

  const handleChange = (e) => {
    const input = e.currentTarget.id
    const value = e.currentTarget.value
    switch (input) {
      case "subject":
        if (subjetError) setSubjetError('')
        value.length ? '' : setSubjetError('Le sujet du vote est obligatoire')
        break;
      case "quota":
        if (quotaError) setQuotaError('')
        parseInt(value) ? setQuota(Math.abs(parseInt(value))) : setQuotaError('Le nombre de participant max dois etre positif')
        break;
      default:
        break;
    }
  }


  async function handleSubmit(e) {
    e.preventDefault()
    let canSubmit = true
    if (submitError) setSubmitError('')
    if (subjetError) setSubjetError('')
    if (quotaError) setQuotaError('')
    if (choiceOneError) setChoiceOneError('')
    if (choiceTwoError) setChoiceTwoError('')
    if (choiceError) setChoiceError({})
    if (successAlert) setSuccessAlert('')

    

    const choices = document.querySelectorAll('.choices-input input')
    const arrayChoices = []
    const errorChoices = {}
    Array.from(choices).map((choice,i) => {
      arrayChoices.push(choice.value)
      if (!choice.value.length) {
        errorChoices[i-1] = "Ce champ est requis"
        setChoiceError(errorChoices)
        setSubmitError('Tous les champs sont requis')
        canSubmit = false
      }
    })

    const body = {
      subject: e.currentTarget.subject.value,
      quota: e.currentTarget.quota.value,
      choiceOne: e.currentTarget.choiceOne.value,
      choiceTwo: e.currentTarget.choiceTwo.value
    }




    if (!body.subject || !body.quota || !body.choiceOne || !body.choiceTwo) {
      setSubmitError('Tous les champs sont requis')
      if (!body.subject) setSubjetError('Le sujet du vote est obligatoire')
      if (!body.quota) setQuotaError('Le nombre de participant max dois etre positif')
      if (!body.choiceOne) setChoiceOneError('Le choix est obligatoire')
      if (!body.choiceTwo) setChoiceTwoError('Le choix est obligatoire')
      canSubmit = false
    }

    body.choices = arrayChoices


    if (!canSubmit) return 

    try {
      // setSuccess(false);
      setLoading(true);

      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (res.status === 201) {
        setSuccessAlert("Le vote est créer")
        window.location.href = '/votes/mes-votes'
      } else {
        const errorMsg = JSON.parse(await res.text()).errorMsg
        setSubmitMsg(errorMsg)
      }
      setLoading(false);

    } catch (error) {
      setLoading(false);
      
    }
  }



  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });


  return (
    <>
      <Layout>
        <Box my={4}>
          
          <Typography variant="h4" component="h1" gutterBottom>
            Nouveau vote
          </Typography>

          {submitError && 
            <Box mt={2} className={classes.alert}>
              <Alert severity="error">
                {submitError}       
              </Alert>
            </Box>
          }

          {successAlert && 
            <Box mt={2} className={classes.alert}>
              <Alert severity="success">
                {successAlert}       
              </Alert>
            </Box>
          }

          <form noValidate method="POST" onSubmit={handleSubmit}>
          <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
          >
            <Grid item container alignItems="center" md={12}
            >
              <TextField onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="subject"
                label="Sujet du vote"
                name="subject"
                autoFocus
                error={subjetError ? true : false}
                helperText={subjetError ? subjetError : ''}
              />

            </Grid>

          </Grid>
          
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item container alignItems="center" md={4}>
              <Grid container item xs={2} alignItems="center" justify="center">
                <IconButton className={classes.btnMinus} aria-label="remove" onClick={handleQuotaMinus}>
                  <RemoveIcon className={classes.btnIcon}/>
                </IconButton>
              </Grid>
              <Grid item xs={8}>
                <TextField onChange={handleChange}
                
                margin="normal"
                required
                fullWidth
                value={quota}
                inputProps={{min: 0, style: { textAlign: 'center', fontSize: '1.5rem' }}}
                id="quota"
                label="Participants max"
                name="quota"
                error={quotaError ? true : false}
                helperText={quotaError ? quotaError : ''}
              />
              </Grid>
              <Grid container item xs={2} justify="center">
                <IconButton className={classes.btnPlus} aria-label="add" onClick={handleQuotaPlus}>
                  <AddIcon className={classes.btnIcon}/>
                </IconButton>


              </Grid>
            </Grid>
            
            
            <Grid item container alignItems="center" md={8}>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="choiceOne"
                      label='Choix 1'
                      name='choice'
                      className={'choices-input'}
                      error={choiceOneError ? true : false}
                      helperText={choiceOneError ? choiceOneError : ''}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="choiceTwo"
                      label='Choix 2'
                      name='choice'
                      className={'choices-input'}
                      error={choiceTwoError ? true : false}
                      helperText={choiceTwoError ? choiceTwoError : ''}
                    />
                </Grid>

                
              </Grid>
            </Grid>
          
          </Grid>

          <Grid container spacing={3}>
          <Hidden smDown implementation="js">
            <Grid item container alignItems="center" md={4}>
              <Grid container item xs={2}></Grid>
              <Grid item xs={8}></Grid>
              <Grid container item xs={2}></Grid>
            </Grid>

          </Hidden>

            <Grid item container alignItems="center" md={8}>
              {additionalChoice.map((choice, index) =>(
                <Grid id={`choice-${index}`} key={choice} container alignItems="center">
                  <Grid item xs={12} md={12}>
                    
                    <FormControl
                      error={choiceError[index] ? true : false}
                      required 
                      fullWidth 
                      className={clsx(classes.margin, classes.textField, 'choices-input')} 
                      variant="outlined"
                     >
                      <InputLabel htmlFor="outlined-adornment-password">{`Choix ${index+3}`}</InputLabel>
                      <OutlinedInput 
                        name={`choices[${index}]`}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="remove choice"
                              edge="end"
                              onClick={()=> handleRemoveChoice(index)}
                            >
                             <CloseIcon className={classes.btnMinus}/>
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                      {choiceError[index] && 
                        <FormHelperText>{choiceError[index]}</FormHelperText>
                      }
                    </FormControl>
                  </Grid>
                  
                </Grid>
              ))}
            </Grid>
            <Grid item md={4}></Grid>
            <Grid item container alignItems="center" md={8}>
              <Grid item container justify="center" sm={12}>
                <Button onClick={handleAddChoice}>Ajouter 1 choix</Button>
              </Grid>
            </Grid>
          </Grid>

          <Box mt={10}>
            <Grid container justify="center">
              <Grid item xs={12} sm={'auto'}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={buttonClassname}
                  disabled={loading}
                  size="large"
                  startIcon={<SaveIcon />}
                >
                  Enregistrer
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Button>

              </Grid>

            </Grid>

          </Box>

          </form>
        </Box>
      </Layout>
    </>
  )
}