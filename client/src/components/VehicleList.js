import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getVehicles  } from '../actions';
import Spinner from './Spinner';

class VehicleList extends React.Component{
  componentDidMount(){
    this.props.getVehicles();
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
                  <button className="btn btn-default btn-xs">config route</button>
                  <Link to={`/editvehicle/${vehicle._id}`} className="btn btn-default btn-xs">Edit</Link>
                  <button className="btn btn-danger btn-xs">Delete</button>
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
export default connect(mapStateToProps,{getVehicles})(VehicleList);
