import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const IGREDIENT_PRICES = {
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
};
class BurgerBuilder extends Component {

 state = {
     ingredients: null,
     totalPrice:4,
     purchasable:false,
     purchasing:false,
     loading:false,
     error:false
 }

componentDidMount(){

    axios.get("https://react-my-burger-75a28.firebaseio.com/ingredients.json")
    .then(response => {
      
        this.setState({ingredients: response.data});
    })
    .catch(error => {

        console.log(error);
        this.setState({error:true});

    });
}

 purchaseHandler = ()=> {
     this.setState({purchasing:true});


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

 purchaseCancelHandler = () => {

    this.setState({purchasing:false});
 }


 purchaseContinueHandler = () =>{
  /*this.setState({loading:true});
    const order = {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
            name:"ASHOK",
            address: {
                street: "60 absolute",
                city:"Mississauga",
                country:"Canada"
            },
           email: "ashok@gmail.com"

        },
        deliveryMethod:"fastest" 

    }
    axios.post("/orders.json",order)
    .then( response => {
        console.log(response);
        this.setState({loading:false, purchasing:false});
    })
    .catch(error => {
        console.log(error);
        this.setState({loading:false, purchasing:false});
    });
*/

 console.log("purchase continue ", this.props);
 let queryParams = [];
for(let i in this.state.ingredients){
    queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]));
}
    queryParams.push('price='+this.state.totalPrice);
    
const queryString = queryParams.join('&');
alert("Purchase Continue!");
 this.props.history.push({pathname:"/checkout", search:"?"+queryString});

 }
    render(){

        const disabledInfo ={...this.state.ingredients};

        let orderSummary= null; 
       
        for(let key in disabledInfo){

            disabledInfo[key]=  disabledInfo[key] <=0 ;
        }

        let burger = this.state.error? <p> Sorry, Ingredients cannot be loaded Now.</p> : <Spinner />;
      if(this.state.ingredients){
        burger = (
            <Auxiliary>
            <Burger ingredients= {this.state.ingredients} />
            <BuildControls ingredientAdded={this.addIngredientHandler} 
            ingredientRemoved = {this.removeIngredientHandler}
             disabled= {disabledInfo} 
             price= {this.state.totalPrice} 
             purchasable={this.state.purchasable}
             ordered={this.purchaseHandler}/>

            
             </Auxiliary>);

             orderSummary = (<OrderSummary ingredients= {this.state.ingredients } 
             purchaseCancelHandler={this.purchaseCancelHandler} 
              purchaseContinue={this.purchaseContinueHandler}
              totalPrice={this.state.totalPrice} 
             /> );
      }

      if(this.state.loading){
        orderSummary = <Spinner />;
    }

        return  (
            <Auxiliary>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
           {orderSummary}
            </Modal>

           {burger}
            </Auxiliary>
         );

    }
}

export default withErrorHandler(BurgerBuilder,axios);