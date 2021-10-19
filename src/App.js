import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import LikedMoviesScreen from './screens/LikedMoviesScreen';
import MovieScreen from './screens/MovieScreen';
import Footer from './components/Footer';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/liked" component={LikedMoviesScreen} />
          <Route path="/movie/:id" component={MovieScreen} />
        </Switch>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
