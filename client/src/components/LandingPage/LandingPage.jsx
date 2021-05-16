import React from 'react';
import {Link} from 'react-router-dom'
import s from './landingPage.module.css'

export default function LandingPage(){
    return(
    <div className={s.contenedor}>
        <h1 className = {s.h1}>Henry Food</h1>
        <div className={s.p}>
            <p>Thousands of Recipes. <br/> Only one click away</p>
        </div>
        <Link to= '/home'>
            <button
            className={s.boton} 
            type='submit'  >Get inspired</button>
        </Link>
    </div>
    )     
    }
