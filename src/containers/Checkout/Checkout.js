import React, {Component} from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
class Checkout extends Component {

    state = {

        ingredients: {
            meat:1,
            cheese:1,
            bacon:1,
            salad:1
        }
    }

    componentDidMount(){

        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let entry of query.entries()){
            //['salad', '1']
            ingredients[entry[0]] = +entry[1];
        }

        this.setState({ingredients: ingredients});
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

        </div>
        );
    }
}

export default Checkout;