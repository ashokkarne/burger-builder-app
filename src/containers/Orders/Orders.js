import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {

    state = {
        orders:[],
        loading:true
    }
    componentDidMount(){


        axios.get("/orders.json")
        .then(response => {
            const fetchedOrders=[];
            for(let key in response.data){
                console.log("key ", key);
                fetchedOrders.push(
                    {...response.data[key], 
                        id:key });


            }
            console.log("Fetched orders :",fetchedOrders);
            this.setState({orders:fetchedOrders, loading:false});
        }).catch(error => {

            this.setState({loading:false});
        });


    }

    render() {

        let orders = null; 

        if(this.state.loading){
            orders = <Spinner /> ;
        }
        //else{
          //  orders = this.state.orders.map((order) => {
                   // return <Order />
           // } 
           // );
        


        return (
            <div>
                {this.state.orders.map(order => ( <Order key={order.id}
                 ingredients={order.ingredients} 
                 price={+order.price} />  ) ) 
                }

            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);