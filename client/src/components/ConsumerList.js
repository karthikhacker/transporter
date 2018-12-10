import React from 'react';
import { connect } from 'react-redux';
import { getConsumers } from '../actions';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

 class ConsumerList extends React.Component {
   state = {
      consumerArray : [],
      filterArray : []
   }
   componentDidMount(){
     this.props.getConsumers();

   }
   handleFilter = (e) => {
     const filterSearch = this.state.consumerArray.filter((consumer) => {
       return consumer.name.indexOf(this.filterText.value) !== -1
     });
     this.setState({ filterArray : filterSearch })
   }
   componentWillReceiveProps(nextProps){
     if(nextProps.consumer.consumer){
       this.setState({ consumerArray : nextProps.consumer.consumer })
     }
     if(nextProps.consumer.consumer){
       this.setState({ filterArray : nextProps.consumer.consumer })
     }
   }
  render() {
    console.log(this.state.consumerArray);
    const { consumer, loading } = this.props.consumer;
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
              this.state.filterArray.map((consumer) => (
               <tr key={consumer._id}>
                 <td>{consumer.name}</td>
                 <td>{consumer.sex}</td>
                 <td>{consumer.address}</td>
                 <td>{consumer.phone}</td>
                 <td>
                   {consumer.needsWave ? <span className="label label-info">Needs wave</span> : null}
                   {consumer.behavioralIssues ? <span className="label label-warning">Behavioral issue</span> : null}
                   {consumer.needTwoSeats ? <span className="label label-success">Two seats</span> : null}
                   {consumer.hasWheelChair ? <span className="label label-primary">Wheel chair</span> : null}
                   {consumer.hasSeizures ? <span className="label label-danger">Seizures</span> : null}
                   {consumer.hasMedication ? <span className="label label-info">Medication</span> : null}
                 </td>
                 <td>{consumer.notes}</td>
                 <td>
                   <button className="btn btn-success btn-sm action-btn">Edit</button>
                   <button className="btn btn-danger btn-sm action-btn">Danger</button>
                 </td>
               </tr>
             ))
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
                 <Link to="/addconsumer" className="btn btn-success btn-sm pull-right">Add cosnumer</Link>
               </div>
             </div>
           </div>
           <div className="panel-body">
             <div className="form-group">
              <input className="form-control" ref={node => (this.filterText = node)} onChange={this.handleFilter} placeholder="Search consumers"/>
             </div>
             {consumer.length > 0 ? renderTable : <p className="text-center">No consumers</p>}
           </div>
         </div>
       )
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {renderConsumer}
          </div>
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
