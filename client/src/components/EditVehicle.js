import React from 'react';
import { connect } from 'react-redux';
import { getVehicle } from '../actions';

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
  }
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="text-center text-muted"><em>Edit Vehicle</em></h4>
              </div>
              <div className="panel-body">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={this.state.name}
                      onChange={this.handleName}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={this.state.seats}
                      onChange={this.handleSeats}
                     />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={this.state.wheelchairs}
                      onChange={this.handleWheelchairs}
                     />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={this.state.flexSeats}
                      onChange={this.handleFlexseats}
                     />
                  </div>
                </form>
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
export default connect(mapStateToProps,{getVehicle})(EditVehicle);
