import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Router, Route, Link, Switch} from 'react-router-dom';
import Login from './Components/Login';
import WarList from './Components/WarList';
import NoMatch from './Components/notfound';
const Root = () => {
return (
<BrowserRouter basename={"/starwars"}>
<div>

<Switch>
<Route path="/Login"  render={(props) => (<Login {...props} />)} />
<Route path="/WarList"  render={(props) => (<WarList {...props} />)} />

<Route component={NoMatch} />
</Switch>
</div>
</BrowserRouter>
)
}



render(<Root/>,document.querySelector("#main"))
