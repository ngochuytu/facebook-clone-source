import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { HashRouter as Router, Switch, Route } from 'react-router-dom'; //Github pages
import { NotificationsProvider } from "./Contexts/NotificationsContext";
import { useFireBaseAuthContext } from './Contexts/FireBaseAuthContext';
import { Redirect } from 'react-router-dom';
import Index from './Components/Index/Index';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Profile from './Components/Profile/Profile';
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Posts from "./Components/Posts/Posts";
function App() {
  const { currentUser } = useFireBaseAuthContext();
  return (
    <Router>
      <Switch>
        <NotificationsProvider>
          <Route exact path="/">
            {currentUser ? <Index /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            {currentUser ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/signup">
            {currentUser ? <Redirect to="/" /> : <Signup />}
          </Route>
          <Route exact path='/reset-password'>
            {currentUser ? <Redirect to="/" /> : <ForgotPassword />}
          </Route>
          <Route exact path='/posts/:postId'>
            {currentUser ? <Posts /> : <Redirect to="/login" />}
          </Route>
          <Route exact path='/:uid'>
            {currentUser ? <Profile /> : <Redirect to="/login" />}
          </Route>
        </NotificationsProvider>
      </Switch>
    </Router>
  );
}

export default App;
