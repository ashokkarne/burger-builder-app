import React from'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {withRouter} from 'react-router-dom';

const burger =  (props) => {

    console.log("Burger Props-->",props);
let transformedIngredients = Object.keys(props.ingredients)
                    .map(igKey => {

                        return  [...Array(props.ingredients[igKey])].map((_,i) =>{
                            return <BurgerIngredient key={igKey+i} type={igKey} />
                        })
                    }).reduce( (arr,currel)=> {

                   return arr.concat(currel); } ,[]);

                    console.log(transformedIngredients);

                    if(transformedIngredients.length === 0)
                    transformedIngredients= (<p>Please add ingredients</p>);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default withRouter(burger);