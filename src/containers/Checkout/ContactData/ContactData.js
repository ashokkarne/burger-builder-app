import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {


    inputChangedHandler = (event,inputIdentifier) => {

        console.log(event.target.value);

       const updatedOrderForm = { ...this.state.orderForm };

       const updatedFormElement =  { ...updatedOrderForm[inputIdentifier]};
       updatedFormElement.value=event.target.value;

       updatedOrderForm[inputIdentifier]=updatedFormElement;
       
      this.setState({orderForm:updatedOrderForm});

    }

    state = {

      orderForm: {
            name:  {  elementType:"input",
                        elementConfig: {
                            type:"text",
                            placeholder:'Name'
                          } ,
                          value:''
                    },
                   
      
            street: {  elementType:"input",
             elementConfig: {
                type:"text",
                placeholder:"Street"
              } ,
              value:''
        },
        city:{  elementType:"input",
            elementConfig: {
               type:"text",
               placeholder:"City"
             } ,
             value:''
       },
            country:{  elementType:"input",
            elementConfig: {
               type:"text",
               placeholder:"Country"
             } ,
             value:''
       },      
             email: {  elementType:"input",
             elementConfig: {
                type:"email",
                placeholder:"E-Mail"
              } ,
              value:''
        },
          deliveryMethod:{  elementType:"select",
          elementConfig: {
            options: [ {value:'fastest', displayValue:"Fastest" },
            {value:'cheapest', displayValue:"Cheapest" }]
           } ,
           value:''
     } 

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

     const formElementsArray=[];
    
     for(let key in this.state.orderForm){

        formElementsArray.push({ id: key, config: this.state.orderForm[key] });
     }

        let form= ( 
        <div>
           {formElementsArray.map( formElement => (
              <Input elementType={formElement.config.elementType} 
              elementConfig={formElement.config.elementConfig}  key={formElement.id} 
              value={formElement.config.value}  changed={ (event) => this.inputChangedHandler(event,formElement.id)} />
           ))} 
           {/*<Input elementType="input" label="Name" name="name" placeholder="Enter Your Name"  />
          
           <Input inputType="input"  label="Email"  name="email" placeholder="Enter Your Mail" />
           <Input inputType="input"  label="Street" name="street" placeholder="Enter Your Street" />
        <Input inputType="input" label="Postal Code" name="postalcode" placeholder="Enter Your Postal Code" />*/}
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