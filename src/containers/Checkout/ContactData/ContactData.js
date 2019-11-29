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

       updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation );
       updatedFormElement.touched=true;
       updatedOrderForm[inputIdentifier]=updatedFormElement;
       console.log(updatedFormElement);

       let formValid=true;
       for(let inputIdentifier in updatedOrderForm){
          
            formValid=updatedOrderForm[inputIdentifier].valid && formValid;
           
       }
      this.setState({orderForm:updatedOrderForm, formValid:formValid});

    }

    checkValidity(value,rules){
        let valid=false;
        if(rules.required){
         valid = value.trim()!=='';
        }
       

        if(valid && rules.minLength){
            valid = value.trim().length>= rules.minLength;
        }
      
        if(valid && rules.maxLength){
            valid = value.trim().length<= rules.maxLength;
        }
         return valid;
    }

    state = {

      orderForm: {
            name:  {  elementType:"input",
                        elementConfig: {
                            type:"text",
                            placeholder:'Name'
                          } ,
                          value:'',
                          validation: { required:true},
                          valid:false,
                          touched:false
                    },
                   
      
            street: {  elementType:"input",
             elementConfig: {
                type:"text",
                placeholder:"Street"
              } ,
              value:'',
              validation: { required:true},
              valid:false,
              touched:false
        },
        city:{  elementType:"input",
            elementConfig: {
               type:"text",
               placeholder:"City"
             } ,
             value:'',
             validation: { required:true},
             valid:false,
             touched:false
       },
       zipCode: {
        elementType:"input",
        elementConfig: {
            type:"text",
            placeholder:"ZIP Code"
          } ,
          value:'',
             validation: { required:true, minLength:5, maxLength:5},
             valid:false,
             touched:false
       },
            country:{  elementType:"input",
            elementConfig: {
               type:"text",
               placeholder:"Country"
             } ,
             value:'',
             validation: { required:true},
             valid:false,
             touched:false
       },      
             email: {  elementType:"input",
             elementConfig: {
                type:"email",
                placeholder:"E-Mail"
              } ,
              value:'',
              validation: { required:true},
              valid:false,
              touched:false
        },
          deliveryMethod:{  elementType:"select",
          elementConfig: {
            options: [ {value:'fastest', displayValue:"Fastest" },
            {value:'cheapest', displayValue:"Cheapest" }]
           } ,
           value:'fastest',
           valid:true,
           validation:{}
          
     } 

      },
        formValid:false,
        loading:false

    }

    
    orderHandler = (event) =>{

        event.preventDefault();
        
        const formData ={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]= this.state.orderForm[formElementIdentifier].value;
        }

        this.setState({loading:true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.state.price,
            orderData: formData          
    
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
       <form onSubmit={this.orderHandler}>
           {formElementsArray.map( formElement => (
              <Input elementType={formElement.config.elementType} 
              elementConfig={formElement.config.elementConfig}  key={formElement.id} 
              value={formElement.config.value} 
              invalid={!formElement.config.valid}  
              shouldValidate = {formElement.config.validation}
              touched = {formElement.config.touched}
              changed={ (event) => this.inputChangedHandler(event,formElement.id)} />
           ))} 
           {/*<Input elementType="input" label="Name" name="name" placeholder="Enter Your Name"  />
          
           <Input inputType="input"  label="Email"  name="email" placeholder="Enter Your Mail" />
           <Input inputType="input"  label="Street" name="street" placeholder="Enter Your Street" />
        <Input inputType="input" label="Postal Code" name="postalcode" placeholder="Enter Your Postal Code" />*/}
        <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
        </form>) ;

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