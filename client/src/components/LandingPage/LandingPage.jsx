import React from 'react';
import {Link} from 'react-router-dom'
import s from './landingPage.module.css'
import {motion} from 'framer-motion'


export default function LandingPage(){
    return(
        <motion.div
        initial='hidden'
        animate='visible'
        variants={{
        hidden: {
            scale: .8,
            opacity: -1
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition:{
                delay: .002
            }
        }
        }}
        >
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
    </motion.div>
    )     
    }
