import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import classnames from 'classnames';
import { addVehicle } from '../actions';

class AddVehicle extends React.Component{
  state = {
    name : '',
    errorName : '',
    seats : '',
    errorSeats : '',
    flexSeats : '',
    errorFlexseats : '',
    wheelchairs : '',
    errorWheelchairs : ''
  }
  handleName = (e) => {
    this.setState({ name : e.target.value }, () => {this.validateName()});
  }
  handleSeats = (e) => {
    this.setState({ seats : e.target.value }, () => {this.validateSeats()});
  }
  handleWheelchairs = (e) => {
    this.setState({ wheelchairs  : e.target.value }, () => {this.validateWheelchairs()})
  }
  handleFlexseats = (e) => {
    this.setState({ flexSeats : e.target.value }, () => {this.validateFlexseats()})
  }
  validateName = () => {
   let { name } = this.state;
   let errorName;
   if(name === ''){
     errorName = 'Name is required!.';
   }
   this.setState({ errorName });
   return !errorName;
  }
  validateSeats = () => {
    let { seats } = this.state;
    let errorSeats;
    if(seats === ''){
      errorSeats = 'Seats cant be empty';
    }else if(seats < 0){
      errorSeats = 'Seats cant be negative';
    }
    this.setState({ errorSeats });
    return !errorSeats;
  }
  validateFlexseats = () => {
    let { flexSeats } = this.state;
    let errorFlexseats;
    if(flexSeats === ''){
      errorFlexseats = 'Cant be empty';
    }else if(flexSeats < 0){
      errorFlexseats = 'Cant be negative';
    }
    this.setState({ errorFlexseats });
    return !errorFlexseats;
  }
  validateWheelchairs = () => {
    let { wheelchairs } = this.state;
    let errorWheelchairs;
    if(wheelchairs === ''){
      errorWheelchairs = 'Cant be empty';
    }else if(wheelchairs < 0){
      errorWheelchairs = 'Cant be negative.';
    }
    this.setState({ errorWheelchairs });
    return !errorWheelchairs;
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.vehicle.vehicle.success === true){
      this.props.history.push('/vehicles');
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const validName = this.validateName();
    if(validName){
      const VehicleData = {
        name : this.state.name,
        seats : this.state.seats,
        wheelchairs  :this.state.wheelchairs,
        flexSeats : this.state.flexSeats
      }
      this.props.addVehicle(VehicleData);
    }
  }
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <div className="panel panel-success">
              <div className="panel-heading">
                <h4 className="text-center">Add Vehicle</h4>
              </div>
              <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                  <div className={classnames('form-group',{ 'has-error' : this.state.errorName })}>
                    <input
                       type="text"
                       className="form-control"
                       placeholder="Name"
                       value = {this.state.name}
                       onChange={this.handleName}
                    />
                  <span className="help-block">{this.state.errorName}</span>
                  </div>
                  <div className={classnames('form-group',{'has-error' : this.state.errorSeats })}>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Number of seats"
                      value={this.state.seats}
                      onChange={this.handleSeats}
                    />
                  <span className="help-block">{this.state.errorSeats}</span>
                  </div>
                  <div className={classnames('form-group',{'has-error' : this.state.errorWheelchairs})}>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Number of wheel chairs"
                      value={this.state.wheelchairs}
                      onChange={this.handleWheelchairs}
                    />
                  <span className="help-block">{this.state.errorWheelchairs}</span>
                  </div>
                  <div className={classnames('form-group',{'has-error' : this.state.errorFlexseats})}>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Number of Foldable seats"
                      value={this.state.flexSeats}
                      onChange={this.handleFlexseats}
                    />
                  <span className="help-block">{this.state.errorFlexseats}</span>
                  </div>
                  <button className="btn btn-info btn-sm">Submit</button>
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
export default connect(mapStateToProps,{ addVehicle })(AddVehicle);
