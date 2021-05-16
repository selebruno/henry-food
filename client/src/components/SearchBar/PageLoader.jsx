import React from 'react';
import {connect} from 'react-redux'
import s from './searchBar.module.css'

export  function PageLoader(props){

if(props.loading===false) return null;
    return(
        <div className={s.loaderContainer}>
            <div className={s.loader}>
                <img className={s.logo} src={'https://www.laventanadealbores.es/images/loading-naranja.gif'} />
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        loading: state.loading
    }
}



export default connect(mapStateToProps)(PageLoader)