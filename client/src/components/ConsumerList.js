import React from 'react';
import { connect } from 'react-redux';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { getConsumers, deleteConsumer } from '../actions';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

 class ConsumerList extends React.Component {
   state = {
      consumerArray : [],
      filterText : '',
      visible : 5,
      male : false
   }
   componentDidMount(){
     this.props.getConsumers();
   }
   handleMale = (e) => {
     this.setState({ male : !this.state.male })
   }
   componentWillReceiveProps(nextProps){
     if(nextProps.consumer.consumer){
       this.setState({ consumerArray : nextProps.consumer.consumer })
     }

   }
   handleFilter = () => {
     this.setState({ filterText : this.myValue.value })
   }
   loadMore = () => {
     this.setState({ visible : this.state.visible + 5 });
   }
   onDelete = (id) => {
     this.props.deleteConsumer(id);
   }

  render() {
    console.log(this.state.consumerArray);
    //console.log("filter array",this.state.filterArray);
    //console.log(this.props.consumer.consumer);
    const { consumerArray } = this.state;
    const { consumer, loading } = this.props.consumer;
    const renderTable = (
      <table className="table" id="table-to-xls">
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
              consumerArray.length > 0 ?  consumerArray
              .filter(consumer => {
                return consumer.name.toLowerCase().indexOf(this.state.filterText) >= 0;
              })
              .slice(0,this.state.visible)
              .map((consumer) => (
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
                   <Link to={`/editconsumer/${consumer._id}`} className="btn btn-success btn-sm action-btn">Edit</Link>
                   <button onClick={() =>  this.onDelete(consumer._id)} className="btn btn-danger btn-sm action-btn">Delete</button>
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
                 <Link to="/addconsumer" className="btn btn-success btn-sm pull-right">Add cosnumer</Link>
                 <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-info btn-sm pull-right"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/>
               </div>
             </div>
           </div>
           <div className="panel-body">
             <div className="form-group">
              <input className="form-control" ref={(value) => {this.myValue = value }} onChange={this.handleFilter} placeholder="Search consumers"/>
             </div>
             <div className="form-group">
               No of consumers - {this.state.consumerArray.length}
             </div>
             {consumer.length > 0 ? renderTable : <p className="text-center">No consumers</p>}
             {this.state.visible < consumerArray.length && <button onClick={this.loadMore} className="btn btn-success btn-sm text-center">Load more</button>}
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
export default connect(mapStateToProps,{getConsumers,deleteConsumer})(ConsumerList);
