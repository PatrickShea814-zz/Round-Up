import React, { Component } from 'react';
import axios from 'axios';

class Transactions extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          transactions: []
      }
    }

    componentDidMount(){
        let user_id = sessionStorage.getItem('user_id');
        if (user_id){
            axios.get(`api/transactions/${user_id}`).then(res =>
                this.setState({transactions: res.data[1]})
            )
    }
    }

     renderTableRows =  () => {
     var rows = [];
     this.state.transactions.map(item =>{
      
     rows.push (
       <tr>
         <td>{item.date}</td>
         <td >{item.transactionName}</td>
         <td>{item.originalAmount}</td>
       </tr>
     )
      
     })

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
          console.log('HELLO');
        return ( 
           <div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Amount</th>
                </tr>
              </thead>


              {this.renderTableRows()}
            </table>
           </div>
        );
      }
}

export default Transactions;