import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const IGREDIENT_PRICES = {
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
};
class BurgerBuilder extends Component {

 state = {
     ingredients: {
         salad:0,
         bacon:0,
         cheese:0,
         meat:0
     },
     totalPrice:4,
     purchasable:false
 }

updatePurchasable = (ingredients)=>{

  //  const ingredients = {...this.state.ingredients};

    const sum =  Object.keys(ingredients).map( igKey =>
        { return ingredients[igKey];  }).reduce( (sum, currentValue) => { 
            return sum+currentValue;
        },0  );


        this.setState( {

            purchasable:  sum >0 

        });
}

 addIngredientHandler = (type) => {

    const updatedIgredients = {...this.state.ingredients};

    const currentCount = this.state.ingredients[type];
    const updatedCount = currentCount+1;
    updatedIgredients[type] = updatedCount;

    const price = IGREDIENT_PRICES[type];
    const updatedPrice = this.state.totalPrice+price;

    this.setState({totalPrice:updatedPrice, ingredients:updatedIgredients });
    this.updatePurchasable(updatedIgredients);
 }

 removeIngredientHandler = (type) => {

    const updatedIgredients = {...this.state.ingredients};

    const currentCount = this.state.ingredients[type];
    if(currentCount ===0 )
    return;

    const updatedCount = currentCount-1;
    updatedIgredients[type] = updatedCount;

    const price = IGREDIENT_PRICES[type];
    const updatedPrice = this.state.totalPrice-price;

    this.setState({totalPrice:updatedPrice, ingredients:updatedIgredients });
    this.updatePurchasable(updatedIgredients);
 }


    render(){

        const disabledInfo ={...this.state.ingredients};

        for(let key in disabledInfo){

            disabledInfo[key]=  disabledInfo[key] <=0 ;
        }

        return  (
            <Auxiliary>
            <Modal> <OrderSummary ingredients= {this.state.ingredients }/> </Modal>
            <Burger ingredients= {this.state.ingredients} />
            <BuildControls ingredientAdded={this.addIngredientHandler} 
            ingredientRemoved = {this.removeIngredientHandler}
             disabled= {disabledInfo} 
             price= {this.state.totalPrice} 
             purchasable={this.state.purchasable}/>
            </Auxiliary>
         );

    }
}

export default BurgerBuilder;