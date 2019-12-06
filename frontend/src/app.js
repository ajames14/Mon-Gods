import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import Spots from './components/Spots'
import SingleSpot from './components/SingleSpot'
import Register from './components/Register'
import Login from './components/Login'
import NewSpot from './components/NewSpot'
import EditSpot from './components/EditSpot'



const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/spots' component={Spots} />
      <Route path='/spots/:id' component={SingleSpot} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <Route path='/newspot' component={NewSpot} />
      <Route path='/edit/:id' component={EditSpot} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)