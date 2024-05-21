import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
