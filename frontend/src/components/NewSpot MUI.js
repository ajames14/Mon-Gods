import React, { useState } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import SpotForm from './SpotForm MUI'

//=========================== VV
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
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1494396550299-e4eb26401c8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2851&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
}));
//===========================

const spotInitialState = {
  spotName: '',
  lat: '',
  long: '',
  country: '',
  region: '',
  image: '',
  description: '',
  level: '',
  typeOfWave: ''
}

const errorInitialState = {
  errors: ''
}



const NewSpot = (props) => {

  //=========================== VV
  const classes = useStyles();
  //=========================== 

  const [form, updateForm] = useState(spotInitialState)
  const [error, setError] = useState(errorInitialState)

  function handleInput(e) {
    updateForm({ ...form, [e.target.name]: e.target.value })
    console.log(form)
    setError({ ...error, errors: '' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form) return
    const newForm = { ...form, authorized: false }
    console.log(newForm)
    axios.post('/api/spots', newForm, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => props.history.push(`/spots/${resp.data._id}`))
      .catch((err) => setError({ errors: err.response.data }))
  }

  return (
    <section className='section'>
      <div className='container'>
        <div className='title'>Share your Favourite Surf Spot</div>
        //=========================== VV old
        {/* <SpotForm 
          handleSubmit={e => handleSubmit(e)}
          handleInput={e => handleInput(e)}
          error={error}
          form={form}
        /> */}
        //=========================== 

        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Share your Favourite Surf Spot
          </Typography>
              <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  type="text"
                  label="Name"
                  name="spotName"
                  autoComplete="spotName"
                  autoFocus
                  value={form.spotName}
                  onChange={(e) => handleInput(e)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => handleInput(e)}
                />
                {error.errors.spotName && !form.spotName && <small className="help is-danger">
                  {error.errors.spotName}
                </small>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                // onClick={console.log('hi')}
                >
                  Sign In
            </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Join Swell"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>

        <form action='' className='form' onSubmit={e => handleSubmit(e)}>
          <div className="field">
            <label htmlFor="" className="label">
              Name
      </label>
            <div className="control">
              <input
                onChange={e => handleInput(e)}
                type="text"
                name="spotName"
                className="input"
                value={form.spotName}
              />
            </div>
            {error.errors.spotName && !form.spotName && <small className="help is-danger">
              {error.errors.spotName}
            </small>}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Latitude (e.g. 18.3359)
      </label>
            <div className="control">
              <input
                onChange={e => handleInput(e)}
                type="text"
                name="lat"
                className="input"
                value={form.lat}
              />
            </div>
            {error.errors.lat && !form.lat && <small className="help is-danger">
              {error.errors.lat}
            </small>}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Longitude (e.g. 46.6154)
      </label>
            <div className="control">
              <input
                onChange={e => handleInput(e)}
                type="text"
                name="long"
                className="input"
                value={form.long}
              />
            </div>
            {error.errors.long && !form.long && <small className="help is-danger">
              {error.errors.long}
            </small>}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Country
      </label>
            <div className="control">
              <input
                onChange={e => handleInput(e)}
                type="text"
                name="country"
                className="input"
                value={form.country}
              />
            </div>
            {error.errors.country && !form.country && <small className="help is-danger">
              {error.errors.country}
            </small>}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Region
      </label>
            <div className="control">
              <input
                onChange={e => handleInput(e)}
                type="text"
                name="region"
                className="input"
                value={form.region}
              />
            </div>
            {error.errors.region && !form.region && <small className="help is-danger">
              {error.errors.region}
            </small>}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Image
      </label>
            <div className="control">
              <input
                onChange={e => handleInput(e)}
                type="text"
                name="image"
                className="input"
                value={form.image}
              />
            </div>
            {error.errors.image && !form.image && <small className="help is-danger">
              {error.errors.image}
            </small>}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Description
      </label>
            <div className="control">
              <input
                onChange={e => handleInput(e)}
                type="text"
                name="description"
                className="input"
                value={form.description}
              />
            </div>
            {error.errors.description && !form.description && <small className="help is-danger">
              {error.errors.description}
            </small>}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Level
      </label>
            <div className="select">
              <select
                onChange={e => handleInput(e)}
                type="text"
                name="level">
                <option value="level"></option>
                <option value="level">Beginner</option>
                <option value="level">Intermediate</option>
                <option value="level">Advanced</option>
              </select>
            </div>
            {error.errors.level && !form.level && <small className="help is-danger">
              {error.errors.level}
            </small>}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Type of Wave
      </label>
            <div className="select">
              <select
                onChange={e => handleInput(e)}
                type="text"
                name="typeOfWave">
                <option></option>
                <option value="typeOfWave">Point Break</option>
                <option value="typeOfWave">Beach Break</option>
                <option value="typeOfWave">Reef Break</option>
                <option value="typeOfWave">River Mouth</option>
              </select>
            </div>
            {error.errors.typeOfWave && !form.typeOfWave && <small className="help is-danger">
              {error.errors.typeOfWave}
            </small>}
          </div>
          {error.errors && error.errors.message === 'Unauthorized' && <small className="help is-danger">
            {error.errors.message} - Please log in
    </small>}
          <button className="button is-success">
            Share New Surf Spot
    </button>
        </form>


      </div>
    </section>


  )
}

export default NewSpot