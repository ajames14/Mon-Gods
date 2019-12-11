import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './styles/styles.scss'

import Spots from './components/Spots'
import SingleSpot from './components/SingleSpot'
import Register from './components/Register'
import Login from './components/Login'
import NewSpot from './components/NewSpot'
import EditSpot from './components/EditSpot'
import Home from './components/Home'
import NavBar from './components/NavBar'
import CountrySpots from './components/Country'
import Profile from './components/Profile'



const App = () => (
  <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/spots' component={Spots} />
      <Route exact path='/spots/countries/:country' component={CountrySpots} />
      <Route exact path='/spots/:id' component={SingleSpot} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <Route path='/newspot' component={NewSpot} />
      <Route path='/edit/:id' component={EditSpot} />
      <Route path='/profile' component={Profile} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)