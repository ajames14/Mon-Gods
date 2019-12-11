import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/styles.scss'
import 'bulma'

import Spots from './components/Spots'
import SingleSpot from './components/SingleSpot'
import Register from './components/Register'
import Login from './components/Login'
import NewSpot from './components/NewSpot'
import EditSpot from './components/EditSpot'
import Home from './components/Home'
import NavBar from './components/NavBar'
import CountrySpots from './components/Country'
import SecureRoute from './components/SecureRoute'



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
      <SecureRoute path='/newspot' component={NewSpot} />
      <SecureRoute path='/edit/:id' component={EditSpot} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)