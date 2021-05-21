import React from 'react';
import s from './Paged.module.css'



export default function Paged ({recipesPerPage, totalRecipes,paged}) {
    const pageNumbers = [];

        for(let i=1; i<=Math.ceil(totalRecipes / recipesPerPage); i++){
            pageNumbers.push(i);
        }
    

    
    return(
        <nav>
            <ul className={s.container}>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li className={s.paged} key={number}> 
                            <a className={s.numbers} onClick={() => paged(number)} >{number}</a>
                        </li>
                    ))
                }     
              
            </ul>

        </nav>
    )
}
  
