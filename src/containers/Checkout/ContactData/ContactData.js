import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {


    state = {

        name:'',
        email:'',
        address: {
            street:'',
            postalCode:''
        },

        loading:false

    }

    
    orderHandler = (event) =>{

        event.preventDefault();
        
        this.setState({loading:true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.state.price,
            customer: {
                name:"Ashok",
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
            this.setState({loading:false});
            this.props.history.push("/");
        })
        .catch(error => {
            console.log(error);
            this.setState({loading:false});
        });


    }


    render() {

    //    console.log(this.props.ingredients);
        let form= ( 
        <div><input type="text" className={classes.Input} name="name" placeholder="Enter Your Name" />
        <input type="email"  className={classes.Input} name="email" placeholder="Enter Your Mail" />
        <input type="text"  className={classes.Input} name="street" placeholder="Enter Your Street" />
        <input type="text"  className={classes.Input} name="postalcode" placeholder="Enter Your Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </div>) ;

        if(this.state.loading){
            form =<Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                               {form}
            </div>
        );
    }

}

export default ContactData;