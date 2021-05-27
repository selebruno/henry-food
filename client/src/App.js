import './App.css';
import {Fragment} from 'react';
import {Route} from 'react-router-dom';
import React from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import RecipeCreate from './components/RecipeCreate/RecipeCreate';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import {AnimatePresence} from 'framer-motion'
import SearchBar from './components/SearchBar/SearchBar';
import SliderHomePage from './components/SliderHomePage/SliderHomePage'



function App() {
  return (
  
   <Fragment>
     <AnimatePresence>
     <Route exact path= '/' component={LandingPage}/>
     <Route  path= '/home' component={SearchBar}/>
     <Route path="/home" component={SliderHomePage} />
     <Route  path= '/post' component={RecipeCreate}/>
     <Route  path= '/recipe/:id' component={RecipeDetail}/>
     </AnimatePresence>
   </Fragment>

  );
}

export default App;
