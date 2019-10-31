import React,{Component} from 'react';
import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState){

    console.log("[Modal] shouldComponentUpdate");
    return nextProps.show !== this.props.show; 
  }

  componentDidUpdate(){

    console.log("[Modal] Componet Did Update");
  }
  render() {
  return ( 
    <Auxiliary>
     <div className={classes.Modal} 
     style={{transform: this.props.show? 'translateY(0)':'translateY(-100VH)', opacity: this.props.show? '1':'0' }}>
        {this.props.children}
    </div>
    <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
    </Auxiliary>)

}
} 
export default Modal;