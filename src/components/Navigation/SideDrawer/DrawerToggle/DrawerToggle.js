import React from 'react';
import classes from './DrawerToggle.css';
import PropTypes from 'prop-types';
const drawerToggle = (props)=> 
(
    <div onClick={props.clicked} className={classes.DrawerToggle}> 
    <div></div>
    <div></div>
    <div></div>

    </div>
)
drawerToggle.propTyes ={
    clicked:PropTypes.func
}
export default drawerToggle;