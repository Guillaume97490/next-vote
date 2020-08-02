import { useState } from 'react';
import {Box, Button, Card, CardContent, CircularProgress, Dialog, DialogTitle, DialogActions, FormControl, FormHelperText, Grid, Grow, IconButton, 
  InputAdornment, InputLabel, OutlinedInput, TextField, Typography} from '@material-ui/core'
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import Layout from 'components/Layout';
import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import { useUser } from 'utils/hooks'

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export default function NewVote() {
  const user = useUser({redirectTo:"/signin"})
  if (user != undefined && user == null) return <div></div>

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

  const [activeStep, setActiveStep] = useState(0);
  const [allowStep0, setAllowStep0] = useState(0)
  const [allowStep1, setAllowStep1] = useState(0)
  const [allowStep2, setAllowStep2] = useState(0)
  const [allowStep3, setAllowStep3] = useState(0)
  const [subjectValue, setSubjectValue] = useState("")
  const [choiceOneValue, setChoiceOneValue] = useState("")
  const [choiceTwoValue, setChoiceTwoValue] = useState("")
  const [additionalChoiceValues,setAdditionalChoiceValues] = useState([])
  const steps = getSteps();

  const handleNext = () => {
    if (activeStep === 0) {
    }
    setTimeout(() => {
      if (activeStep === 1) {
        const choices = document.querySelectorAll('.choices-input input')
        const event = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        let keyupEvent = new Event('keyup');
        Array.from(choices).map((choice,i,arr) => {
          if (i > 1) {
            choice.value = additionalChoiceValues[i-2]
            choice.dispatchEvent(event)
          }
        })
      }
      
    }, 200);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
  };

  const handleBack = () => {
    setTimeout(() => {
      if (activeStep === 3) {
        const choices = document.querySelectorAll('.choices-input input')
        const event = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        Array.from(choices).map((choice,i,arr) => {
          if (i > 1) {
            choice.value = additionalChoiceValues[i-2]
          }
        })
      }
      
    }, 200);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleAdditionalChoiceChange = () => {
    let canNext = 1
    const choices = document.querySelectorAll('.choices-input input')
      const arrayChoices = []
      const errorChoices = {}
      Array.from(choices).map((choice,i,arr) => {
        arrayChoices.push(choice.value)
        if (!choice.value.length) {
          errorChoices[i-2] = "Ce champ est requis"
          setChoiceError(errorChoices)
          canNext = 0
        } else {
          errorChoices[i-2] = ""
          setChoiceError(errorChoices)
        }
        if (arr.length -1 === i) {
          setAllowStep2(canNext)
          setAdditionalChoiceValues(arrayChoices.slice(2,arrayChoices.length))
        }
      })
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
    setAllowStep2(0)
  }

  const handleRemoveChoice = (index) => {
    setAdditionalChoice(additionalChoice.filter((_, i) => i !== index));
    setTimeout(() => {
      handleAdditionalChoiceChange()
    }, 200);
  }

  const handleChange = (e) => {
    const input = e.currentTarget.id
    const value = e.currentTarget.value
    switch (input) {
      case "subject":
        setSubjectValue(value)
        if (subjetError) setSubjetError('')
        if (!value.length) {
          setSubjetError('Le sujet du vote est obligatoire')
          setAllowStep0(0)
        } else {
          setAllowStep0(1)
        }
        break;
      case "quota":
        if (quotaError) setQuotaError('')
        if (parseInt(value)){
          setQuota(Math.abs(parseInt(value))) 
          setAllowStep1(1)
        } else {
          setQuotaError('Le nombre de participant max dois etre positif')
          setAllowStep1(0)
        }
        break;
      case "choiceOne":
        setChoiceOneValue(value)
        if (value && choiceTwoValue) setAllowStep2(1)
        if (!value.length || !choiceTwoValue.length) setAllowStep2(0)
        
        break;
      case "choiceTwo":
        setChoiceTwoValue(value)
        if (choiceOneValue && value) setAllowStep2(1)
        if (!choiceOneValue.length || !value.length) setAllowStep2(0)
        break;

      default:
        break;
    }
  }

  function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      window.location.href = '/votes/mes-votes'
    };

    const handleListItemClick = (value) => {
      onClose(value);
    };


    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={true}>
        <DialogTitle style={{color: green[500]}} id="simple-dialog-title">{successAlert}</DialogTitle>
        <Grow in={true}
          {...(true ? { timeout: 1000 } : {})}
        >
          <Box align="center">
            <CheckCircleOutlineIcon style={{fontSize:"5rem", color: green[500]}}/>
          </Box>
        </Grow>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>

        </DialogActions>
      </Dialog>
    );
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
      subject: subjectValue,
      quota: quota,
      choiceOne: choiceOneValue,
      choiceTwo: choiceTwoValue
    }




    if (!body.subject || !body.quota || !body.choiceOne || !body.choiceTwo) {
      setSubmitError('Tous les champs sont requis')
      if (!body.subject) setSubjetError('Le sujet du vote est obligatoire')
      if (!body.quota) setQuotaError('Le nombre de participant max dois etre positif')
      if (!body.choiceOne) setChoiceOneError('Le choix est obligatoire')
      if (!body.choiceTwo) setChoiceTwoError('Le choix est obligatoire')
      canSubmit = false
    }



    body.choices = [choiceOneValue, choiceTwoValue, ...additionalChoiceValues]

    if (!canSubmit) return 

    try {
      setLoading(true);

      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (res.status === 201) {
        setSuccessAlert("Votre vote a bien été créer")
        // window.location.href = '/votes/mes-votes'
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

  function getSteps() {
    return ['Sujet du vote', 'Nombre de participant', 'Choix disponible','Recap'];
  }
  
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Sur quel sujet les utilisateurs voterons ?';
      case 1:
        return 'Quel sera le nombre de personnes maximum autorisés a s\'inscrire à ce vote ?'
      case 2:
        return 'Quel serons les choix disponible sur ce vote ?';
      case 3:
        return 'Récapitulons ! Vous avez choisis :';
      default:
        return 'Unknown stepIndex';
    }
  }


  return (
    <>
      <Layout title="Nouveau vote">

        {user != undefined && user != null &&
            <form noValidate method="POST" onSubmit={handleSubmit}>
          <Box my={4}>
            

          <div className={classes.root}>
            <Stepper activeStep={activeStep} style={{padding:0, margin: "0 -15px"}} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>All steps completed</Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                <Box mt={5}>
                  <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                  <div>

                    {activeStep === 0 && 
                      <TextField onChange={handleChange}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      value={subjectValue}
                      id="subject"
                      label="Sujet du vote"
                      name="subject"
                      autoFocus
                      error={subjetError ? true : false}
                      helperText={subjetError ? subjetError : ''}
                      />
                    }

                    {activeStep === 1 && 
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
                    }

                    {activeStep === 2 &&
                    <>
                      <Grid item container alignItems="center" md={12}>
                       
                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={handleChange}
                            fullWidth
                            value={choiceOneValue}
                            id="choiceOne"
                            label='Choix 1'
                            name='choice'
                            className={'choices-input'}
                            error={choiceOneError ? true : false}
                            helperText={choiceOneError ? choiceOneError : ''}
                          />
                        
                        <Grid item xs={12} sm={12}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={handleChange}
                            fullWidth
                            value={choiceTwoValue}
                            id="choiceTwo"
                            label='Choix 2'
                            name='choice'
                            className={'choices-input'}
                            error={choiceTwoError ? true : false}
                            helperText={choiceTwoError ? choiceTwoError : ''}
                          />
                          <Box mb="15px"></Box>
                        </Grid>
                      </Grid>

                      
                        <Grid item container alignItems="center" md={12}>
                          {additionalChoice.map((choice, index) =>(
                            <Grid id={`choice-${index}`} key={choice} container alignItems="center">
                              
                                
                                <FormControl onChange={handleAdditionalChoiceChange} focused={additionalChoiceValues[index] == undefined ? false : true}
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
                          ))}
                        </Grid>
                        
                        <Grid item container alignItems="center" md={12}>
                          {/* <Grid item container justify="center" sm={12}> */}
                            <Button onClick={handleAddChoice}>Ajouter 1 choix</Button>
                          {/* </Grid> */}
                        </Grid>
                      
                      </>
                    }

                    {activeStep === 3 &&
                      <>
                        <Box my={3}>
                          <Card className={classes.root}>
                            <CardContent>
                              <Typography>
                                Sujet du vote : <Typography variant="h6" component="span">{subjectValue}</Typography>
                              </Typography>

                              <Typography>
                                Participants maxi : <Typography variant="h6" component="span">{quota}</Typography>
                              </Typography>

                              {[choiceOneValue, choiceTwoValue, ...additionalChoiceValues].map((choice, i) => 
                                <Typography key={i}>
                                Choix {i+1} : <Typography variant="h6" component="span">{choice}</Typography>
                                </Typography>
                              )} 

                            </CardContent>

                          </Card>

                        </Box>
                        

                      </>
                    }


                    <Box textAlign="right" mt={5}>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                      >
                        Retour
                      </Button>
                      
                      <Button 
                        disabled={
                          !allowStep0 && activeStep == 0 ||
                          // (!choiceOneValue.length || !choiceTwoValue.length) && activeStep == 2 ||
                          !allowStep2 && activeStep == 2 ||
                          loading
                        }
                        variant="contained" color="primary"
                        onClick={activeStep !== steps.length -1 ? handleNext : handleSubmit}>
                        {activeStep === steps.length - 1 ? 'Valider' : 'Suivant'}
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />
                        }
                      </Button>

                    </Box>

                  
                  </div>
                </Box>
              )}
            </div>
          </div>


            
            

            {submitError && 
              <Box mt={2} className={classes.alert}>
                <Alert severity="error">
                  {submitError}       
                </Alert>
              </Box>
            }

            {successAlert && 
              <Box>
                <SimpleDialog open={open} />
              </Box>
              // <Box mt={2} className={classes.alert}>
              //   <Alert severity="success">
              //     {successAlert}       
              //   </Alert>
              // </Box>
            }

            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
            >
              <Grid item container alignItems="center" md={12}
              >
                {/* <TextField onChange={handleChange}
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
                /> */}

              </Grid>

            </Grid>
            
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={3}
            >
            </Grid>

            

            {/* <Box mt={10}>
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

            </Box> */}

          </Box>
      
        </form>
        }

      </Layout>
    </>
  )
}