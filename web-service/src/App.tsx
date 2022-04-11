import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { LoginSuccess } from './pages/LoginSuccess'
import { Login } from './pages/Login';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} exact/>
          <Route exact path="/login/success" component={LoginSuccess} />
          <Route exact path="/login/error">
            Error logging in. Please try again later.
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
