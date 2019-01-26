import React from 'react';
import { connect } from 'react-redux';
import { getVehicle } from '../actions';



class MapPage extends React.Component{
  state = {
    _id : this.props.match.params.id,
    name : '',
    seats : '',
    flexSeats : '',
    wheelchairs : ''
  }


   initMap = () => {
      var  map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }


  componentDidMount(){
    this.props.getVehicle(this.props.match.params.id);
    this.renderMap();
  }
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyACOa7wZ9Y3v6KaQxq9_NM4UFXonKgRt5E&callback=initMap")
    window.initMap = this.initMap;
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
    //console.log(this.props.vehicle.vehicle);
    const { consumers } = this.props.vehicle.vehicle;
    console.log(consumers);
    let renderConsumers;
    if(consumers){
      renderConsumers = (
        <ul className="list-group">
          {
            consumers.length > 0 ? consumers.map((consumer) => (
             <li key={consumer._id}>{consumer.name}</li>
           )) : <p className="text-center">No cosnumers</p>
          }
        </ul>
      )
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
           <div className="panel panel-primary">
             <div className="panel-heading">
               <div className="row">
                 <div className="col-sm-4">
                   <p>{this.state.name}</p>
                 </div>
                 <div className="col-sm-4">
                   <span className="label label-info pull-right">{this.state.seats}</span>
                   <span className="label label-success pull-right">{this.state.flexSeats}</span>
                   <span className="label label-warning pull-right">{this.state.wheelchairs}</span>
                 </div>
               </div>
             </div>
             <div className="panel-body">
               {renderConsumers}
             </div>
           </div>
          </div>
          <div className="col-sm-6" id="map">

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
function loadScript(url){
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true;
  script.defer = true
  index.parentNode.insertBefore(script,index)
}
export default  connect(mapStateToProps,{getVehicle})(MapPage)
