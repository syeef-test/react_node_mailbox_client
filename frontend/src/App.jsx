import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ForgetPassword from "./pages/ForgetPassword";
import Profile from "./pages/Profile";
import SendMail from "./pages/SendMail";
import InBox from "./pages/Inbox";

import { useSelector } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/forgetPassword">
            <ForgetPassword />
          </Route>
          <Route path="/profile">{isAuth && <Profile />}</Route>
          <Route path="/sendMail">{isAuth && <SendMail />}</Route>
          <Route path="/inbox">{isAuth && <InBox />}</Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
