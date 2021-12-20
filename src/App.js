import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navigation from './components/Navigation';
import Home from './components/Home'; 
import PostDetails from './components/PostDetails'; 
import PostAdd from './components/PostAdd';
import Login from './components/Login';


function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />

        <main role="main">

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/addPost">
              <PostAdd />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/logout">
              <Login />
            </Route>
            <Route exact path="/postDetails/:postId">
              <PostDetails />
            </Route>
          </Switch>

        </main>

        <footer className="container">
          <p>&copy; Company 2017-2020</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
