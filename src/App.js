import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'; //Github pages
import { NotificationsProvider } from "./Contexts/NotificationsContext";
import { useFireBaseAuthContext } from './Contexts/FireBaseAuthContext';
import BreakPointContextProvider from "./Contexts/BreakPointContext";
import Index from "./Routes/Index/Index";
import Login from "./Routes/Login/Index";
import Signup from "./Routes/Signup/Index";
import ForgotPassword from "./Routes/ForgotPassword/Index";
import Posts from "./Routes/Posts/Index";
import Profile from "./Routes/Profile/Index";
import Bookmarks from "./Routes/Bookmarks/Index";

function App() {
  const { currentUser } = useFireBaseAuthContext();
  return (
    <Router>
      <NotificationsProvider>
        <BreakPointContextProvider>
          <Switch>
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
            <Route exact path='/bookmarks'>
              {currentUser ? <Bookmarks /> : <Redirect to="/login" />}
            </Route>
            <Route exact path='/posts/:postId'>
              {currentUser ? <Posts /> : <Redirect to="/login" />}
            </Route>
            <Route path='/:uid'>
              {currentUser ? <Profile /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </BreakPointContextProvider>
      </NotificationsProvider>
    </Router>
  );
}

export default App;
