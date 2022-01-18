import './App.css';
import {Fragment} from "react";
import {Switch, Route} from "react-router-dom"
import Home from "./components/Home";

function App() {
  return (
      <Fragment>
        <Switch>
          <Route path="/" component={Home} exact/>
        </Switch>
      </Fragment>
  )
}

export default App;
