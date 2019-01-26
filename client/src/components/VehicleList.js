import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getVehicles, deleteVehicle  } from '../actions';
import Spinner from './Spinner';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class VehicleList extends React.Component{
  state = {
    modalIsOpen : false
  }
  componentDidMount(){
    this.props.getVehicles();
  }
  handleDelete = (id) => {
    console.log(id);
    this.props.deleteVehicle(id);
    this.closeModal();
  }
  modelOpen = () => {
    this.setState({ modalIsOpen : true })
  }
  closeModal = () => {
    this.setState({ modalIsOpen : false })
  }

  render(){
    console.log(this.props.vehicle);
    const { vehicle, loading } = this.props.vehicle;
    const renderTable = (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Seats</th>
            <th>Wheelchairs</th>
            <th>Foldable seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            vehicle.length > 0 ?  vehicle.map((vehicle) => (
              <tr key={vehicle._id}>
                <td>{vehicle.name}</td>
                <td>{vehicle.seats}</td>
                <td>{vehicle.wheelchairs}</td>
                <td>{vehicle.flexSeats}</td>
                <td>
                  <Link to={`/detail/${vehicle._id}`} className="btn btn-default btn-xs">Add consumers</Link>
                  <Link to={`/editvehicle/${vehicle._id}`} className="btn btn-default btn-xs">Edit</Link>
                  <button onClick={this.modelOpen} className="btn btn-danger btn-xs">Delete</button>
                  <Modal
                     isOpen={this.state.modalIsOpen}
                     onAfterOpen={this.afterOpenModal}
                     onRequestClose={this.closeModal}
                     style={customStyles}
                     contentLabel="Example Modal"
                     ariaHideApp = {false}
                   >
                     <h2>Are you sure you want to delete ? </h2>
                   <button onClick={this.closeModal} className="btn btn-success btn-sm">No</button>
                   <button className="btn btn-danger btn-sm" onClick={ () => this.handleDelete(vehicle._id)}>delete</button>
                   </Modal>
                </td>
              </tr>
            )) : null
          }
        </tbody>
      </table>
    )
    let renderVehicle;
    if(vehicle === null  || loading){
      renderVehicle = <Spinner />
    }else{
      renderVehicle = (
        <div className="panel panel-success">
           <div className="panel-heading">
             <div className="row">
               <div className="col-sm-6">
                 <p>Vehicles</p>
               </div>
               <div className="col-sm-6">
                 <Link to="/addvehicle" className="btn btn-default btn-sm pull-right">Add Vehicle</Link>
               </div>
             </div>
           </div>
           <div className="panel-body">
             {vehicle.length > 0 ? renderTable : <p>No vehicles</p>}
           </div>
        </div>
      )
    }
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {renderVehicle}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return{
    vehicle : state.vehicle
  }
}
export default connect(mapStateToProps,{getVehicles, deleteVehicle})(VehicleList);
