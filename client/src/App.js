import './App.css';
import {Fragment} from 'react';
import {Route} from 'react-router-dom';
import React from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import RecipeCreate from './components/RecipeCreate/RecipeCreate';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import SearchBar from './components/SearchBar/SearchBar'


function App() {
  return (
   <Fragment>
     <Route exact path= '/' component={LandingPage}/>
     <Route  path= '/home' component={SearchBar}/>
     <Route  path= '/post' component={RecipeCreate}/>
     <Route  path= '/recipe/:id' component={RecipeDetail}/>
   </Fragment>
  );
}

export default App;
