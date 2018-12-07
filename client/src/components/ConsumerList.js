import React from 'react';
import { connect } from 'react-redux';
import { getConsumers } from '../actions';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

 class ConsumerList extends React.Component {
   state = {
     consumers : []
   }
   componentDidMount(){
     this.props.getConsumers();

   }

   filterConsumer = (event) => {
     this.setState({ search : event.target.value});

   }
   componentWillReceiveProps(nextProps){
     if(nextProps.consumer){
       this.setState({ consumers : nextProps.consumer})
     }
   }
  render() {
    console.log(this.state.consumers);
    const { consumer, loading } = this.state.consumers;
    const renderTable = (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Needs</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.consumers.consumer ? this.state.consumers.consumer.map(consumer => (
            <tr key={consumer._id}>
              <td>{consumer.name}</td>
              <td>{consumer.sex}</td>
              <td>{consumer.address}</td>
              <td>{consumer.phone}</td>
              <td>
                {consumer.behavioralIssues ? <span className="label label-info">Behavioral behavioralIssues</span> : null}
                {consumer.hasMedication ? <span className="label label-warning">Medication</span> : null}
                {consumer.hasSeizures ? <span className="label label-primary">hasSeizures</span> : null}
                {consumer.hasWheelChair ? <span className="label label-success">hasWheelChair</span> : null}
                {consumer.needTwoSeats ? <span className="label label-danger">Need two seats</span> : null}
                {consumer.needsWave ? <span className="label label-info">Need waves</span> : null}
              </td>
              <td>{consumer.notes}</td>
              <td>
                <button className="btn btn-success btn-sm">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          )) : null
        }
        </tbody>
      </table>
    )
    let renderConsumer;
    if(consumer === null || loading){
      renderConsumer = <Spinner />
    }else{
       renderConsumer = (
         <div className="panel panel-primary">
           <div className="panel-heading">
             <div className="row">
               <div className="col-sm-6">
                 <p>Consumers</p>
               </div>
               <div className="col-sm-6">
                 <Link to="/addconsumer" className="btn btn-success pull-right">Add consumer</Link>
               </div>
             </div>
           </div>
           <div className="panel-body">
              {renderTable}
           </div>
         </div>
       )
    }
    return (
      <div className="container">
        <div className="row">
          {renderConsumer}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    auth : state.auth,
    consumer : state.consumer
  }
}
export default connect(mapStateToProps,{getConsumers})(ConsumerList);
