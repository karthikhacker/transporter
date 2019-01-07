import React from 'react';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import { getVehicle, updateVehicle } from '../actions';

class EditVehicle extends React.Component{
  state = {
    _id : this.props.match.params.id,
    name : '',
    seats  : '',
    wheelchairs : '',
    flexSeats : ''
  }
  componentDidMount(){
    this.props.getVehicle(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps){
    const vehicle = nextProps.vehicle.vehicle;
    this.setState({
      _id : vehicle._id,
      name : vehicle.name,
      seats : vehicle.seats,
      flexSeats : vehicle.flexSeats,
      wheelchairs : vehicle.wheelchairs
    })
    if(vehicle.success === true){
      this.props.history.push('/vehicles');
    }
  }
  handleName = (e) => {
    this.setState({ name : e.target.value });
  }
  handleSeats = (e) => {
    this.setState({ seats : e.target.value });
  }
  handleFlexseats = (e) => {
    this.setState({ flexSeats : e.target.value });
  }
  handleWheelchairs = (e) => {
    this.setState({ wheelchairs : e.target.value })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const vehicleData = {
      name : this.state.name,
      seats : this.state.seats,
      wheelchairs : this.state.wheelchairs,
      flexSeats : this.state.flexSeats
    }
    this.props.updateVehicle(vehicleData,this.props.match.params.id);
  }

  render(){
    console.log(this.props.vehicle);
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="text-center text-muted"><em>Edit Vehicle</em></h4>
              </div>
              <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={this.state.name}
                      onChange={this.handleName}
                    />
                  </div>
                  <div className="form-group">
                    <label>Seats</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={this.state.seats}
                      onChange={this.handleSeats}
                     />
                  </div>
                  <div className="form-group">
                    <label>Wheel chair</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={this.state.wheelchairs}
                      onChange={this.handleWheelchairs}
                     />
                  </div>
                  <div className="form-group">
                    <label>Foldable seats</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={this.state.flexSeats}
                      onChange={this.handleFlexseats}
                     />
                  </div>
                  <button className="btn btn-primary btn-sm">Submit</button>
                </form>
                {this.props.vehicle.loading ? <Spinner /> : null}
              </div>
            </div>
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
export default connect(mapStateToProps,{ getVehicle, updateVehicle })(EditVehicle);
