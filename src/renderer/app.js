import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import routes from './routes'

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              {routes.map((route, i) => (
                <Route key={i} {...route} />
              ))}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
