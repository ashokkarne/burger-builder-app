
import React from 'react';
import classes from './Input.css';

const input = (props) => {

    let inputElement=null;

    const inputClasses = [classes.InputElement];
  //  const {inputType, ...inputProps} =props;
 let validationError='';
  if(props.invalid  && props.shouldValidate && props.touched){
      inputClasses.push(classes.Invalid);
      validationError=(<p>Please enter valid value! </p>)
  }
    switch(props.elementType){

        case 'input':
                inputElement = <input className={inputClasses.join(' ')} 
                {...props.elementConfig}  value={props.value}  onChange={props.changed}/>;
                break;
        case 'textarea':
                inputElement = <input className={inputClasses.join(' ')}
                 {...props.elementConfig}  value={props.value} onChange={props.changed}/>;
                break;

        case 'select':
               inputElement = (<select className={inputClasses.join(' ')}  value={props.elementConfig.value}
                onChange={props.changed}> 
                    {props.elementConfig.options.map( option => 
                        <option value={option.value} key={option.value}>{option.displayValue}</option>
                            )}
               </select> )

               break;

        default:
              inputElement = <input  className={inputClasses.join(' ')} 
              {...props.elementConfig}  value={props.value} onChange={props.changed}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
{validationError}
        </div>
    )

}
export default input;