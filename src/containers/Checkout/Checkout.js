import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route} from "react-router-dom";
import ContactData from './ContactData/ContactData';
class Checkout extends Component {

    state = {

        ingredients: null,
        totalPrice:0
    }

    componentWillMount(){

        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price=0;
        for(let entry of query.entries()){
            //['salad', '1']
            if(entry[0] === 'price')
            {
                    price= entry[0];
            }
            else{
            ingredients[entry[0]] = +entry[1];
            }
        }

        this.setState({ingredients: ingredients,
            totalPrice:price
        });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler= ()=> {
        this.props.history.replace("/checkout/contact-data");
    }
    render() {
  console.log("checkout props--->",this.props);
        return  (
         <div>
             <CheckoutSummary ingredients= {this.state.ingredients} 
             checkoutCancelled={this.checkoutCancelledHandler}
             checkoutContinued={this.checkoutContinuedHandler}
             />

        <Route path={this.props.match.url+'/contact-data'} render= {(props) =>  <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}  {...props} />  }/>

        </div>
        );
    }
}

export default Checkout;