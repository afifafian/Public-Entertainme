import React from 'react';
import { 
  Home, 
  Movies, 
  Series, 
  MovieDetail, 
  SeriesDetail, 
  AddMovie, 
  AddSeries, 
  EditMovie, 
  EditSeries, 
  Favorites,
  NotFound } from './pages';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from './config/client';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
      <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/movies">
              <Movies />
            </Route>
            <Route exact path="/series">
              <Series />
            </Route>
            <Route exact path="/movie/:id">
              <MovieDetail />
            </Route>
            <Route exact path="/series/:id">
              <SeriesDetail />
            </Route>
            <Route exact path="/create/movie">
              <AddMovie />
            </Route>
            <Route exact path="/create/series/">
              <AddSeries />
            </Route>
            <Route exact path="/movie/edit/:id">
              <EditMovie />
            </Route>
            <Route exact path="/series/edit/:id">
              <EditSeries />
            </Route>
            <Route exact path="/favorites">
              <Favorites />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
    </div>
    </ApolloProvider>
  );
}

export default App;
