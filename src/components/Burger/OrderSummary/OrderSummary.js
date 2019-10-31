import React, {Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component  {

   /* shouldComponentUpdate(){
        console.log("[OrderSummary] Should Component Update");
        return true;
    }*/

    componentDidUpdate(){
        console.log("[OrderSummary] Component Did Update");
    }

    render(){

    
    const ingredientSummary = Object.keys(this.props.ingredients)
                        .map( igKey => {
                            return (<li key={igKey}> <span style={{textTransform:"capitalize"}}>igKey </span> 
                            : {this.props.ingredients[igKey]} </li>);
                        }   );
    return (
      <Auxiliary>
        <h3>Your Order</h3>
        <p> A delicious burger with  the following ingredients:</p>
        <ul>
        {ingredientSummary}
        </ul>
        <p> <strong>Total Price: {this.props.totalPrice.toFixed(2)} </strong> </p>
        <p> Continue to Checkout?</p>
        <Button buttonType='Danger' clicked={this.props.purchaseCancelHandler}  >CANCEL</Button>
        <Button buttonType='Success' clicked={this.props.purchaseContinue} >CONTINUE</Button>
       
        </Auxiliary>
    );
 }
}
export default OrderSummary;