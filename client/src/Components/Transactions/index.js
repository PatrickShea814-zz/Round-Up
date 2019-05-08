import React, { Redirect, Component, History } from 'react';
import Home from '../Home/HomeAbout'
import axios from 'axios';

class Transactions extends Component {
    constructor(props) {
      super(props);

      this.state = {
          transactions: []
      }
    }

    componentDidMount(){

        let user_id = sessionStorage.getItem('user_id');

        if(!user_id) this.props.history.replace('/home');

        else {axios.get(`api/transactions/${user_id}`).then(res =>{
          console.log('THIS IS OUR RESPONSE', res.data)
          if(res.data.length !== 0){
          this.setState({transactions: res.data})
          }
          else {
            this.props.history.replace('/plaid')
          }
        })
      }
          
    }
    

     renderTableRows =  () => {
     var rows = [];
     if (this.state.transactions.length > 0){
     this.state.transactions.map(item =>{
      
     rows.push (
       <tr>
         <td>{item.date}</td>
         <td>{item.name}</td>
         <td >{item.transactionName}</td>
         <td>{item.originalAmount}</td>
       </tr>
     )
      
     })
    }

     var tby = <tbody>
           {rows.map((item) => {
             return (
               item
             )
           })}
         </tbody>
     
     return tby;

    }
     
      render() {
       if(this.state.transactions.length > 0){
        return ( 
           <div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Account</th>
                  <th>Vendor</th>
                  <th>Amount</th>
                </tr>
              </thead>


              {this.renderTableRows()}
            </table>
           </div>
        );
      }
      else return (
        <Home />
      )
  }

}
    
export default Transactions;