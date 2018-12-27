import React from 'react';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { getConsumer, updateConsumer } from '../actions';

class EditConsumer extends React.Component{
  state = {
    _id : this.props.match.params.id,
    name : '',
    sex : '',
    address : '',
    phone : '',
    notes : '',
    needsWave : false,
    behavioralIssues : false,
    needTwoSeats : false,
    hasWheelChair : false,
    hasSeizures : false,
    hasMedication : false
  }
  componentDidMount(){
    this.props.getConsumer(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps){
    const consumer = nextProps.consumer.consumer;
    this.setState({
      _id : consumer._id,
      name : consumer.name,
      sex : consumer.sex,
      address : consumer.address,
      phone : consumer.phone,
      notes : consumer.notes,
      needsWave : consumer.needsWave,
      behavioralIssues : consumer.behavioralIssues,
      needTwoSeats : consumer.needTwoSeats,
      hasWheelChair : consumer.hasWheelChair,
      hasSeizures : consumer.hasSeizures,
      hasMedication : consumer.hasMedication
    })
    if(consumer.success === true){
      this.props.history.push('/consumers');
    }
  }
  handleName = (e) => {
    this.setState({ name : e.target.value });
  }
  handleSex = (e) => {
    this.setState({ sex : e.target.value });
  }
  handleAddress = (e) => {
    this.setState({address : e.target.value });
  }
  handlePhone = (e) => {
    this.setState({ phone : e.target.value })
  }
  handleNotes = (e) => {
    this.setState({ notes : e.target.value })
  }
  handleNeedsWave = (e) => {
    this.setState({ needsWave : !this.state.needsWave })
  }
  handleBehavioralissues = (e) => {
    this.setState({ behavioralIssues : !this.state.behavioralIssues })
  }
  handleNeedTwoSeats = (e) => {
    this.setState({ needTwoSeats : !this.state.needTwoSeats })
  }
  handleHasWheelChair = (e) => {
    this.setState({ hasWheelChair : !this.state.hasWheelChair })
  }
  handleSeizures = (e) => {
    this.setState({ hasSeizures : !this.state.hasSeizures })
  }
  handleMedication = (e) => {
    this.setState({ hasMedication : !this.state.hasMedication })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const consumerData = {
      name : this.state.name,
      sex : this.state.sex,
      address : this.state.address,
      phone : this.state.phone,
      notes : this.state.notes,
      needsWave : this.state.needsWave,
      behavioralIssues : this.state.behavioralIssues,
      needTwoSeats : this.state.needTwoSeats,
      hasWheelChair : this.state.hasWheelChair,
      hasSeizures : this.state.hasSeizures,
      hasMedication : this.state.hasMedication
    }
    this.props.updateConsumer(consumerData,this.props.match.params.id);
  }
  render(){
    console.log(this.props.consumer);
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h4 className="text-center">Update Consumer</h4>
              </div>
              <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                       type="text"
                       className="form-control"
                       defaultValue={this.state.name}
                       onChange={this.handleName}/>
                  </div>
                  <div className="form-group">
                  <select className="form-control" value={this.state.sex}  onChange={this.handleSex}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={this.state.address}
                      onChange={this.handleAddress}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={this.state.phone}
                      onChange={this.handlePhone}
                     />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" defaultValue={this.state.notes} onChange={this.handleNotes}/>
                  </div>
                  <div className="form-group">
                   <div className="row">
                     <div className="col-sm-6">
                       <div className="checkbox">
                         <label>
                           <input type="checkbox" checked={this.state.needsWave} onChange={this.handleNeedsWave} />
                           Needs wave
                         </label>
                       </div>
                       <div className="checkbox">
                         <label>
                           <input type="checkbox" checked={this.state.behavioralIssues} onChange={this.handleBehavioralissues} />
                           behavioralIssues
                         </label>
                       </div>
                       <div className="checkbox">
                         <label>
                           <input type="checkbox" checked={this.state.needTwoSeats} onChange={this.handleNeedTwoSeats}/>
                           Need Two seats
                         </label>
                       </div>
                     </div>
                     <div className="col-sm-6">
                       <div className="checkbox">
                         <label>
                           <input type="checkbox" checked={this.state.hasWheelChair} onChange={this.handleHasWheelChair} />
                           Has Wheel Chair
                         </label>
                       </div>
                       <div className="checkbox">
                         <label>
                           <input type="checkbox" checked={this.state.hasSeizures} onChange={this.handleSeizures}/>
                            Seizures
                         </label>
                       </div>
                       <div className="checkbox">
                         <label>
                           <input type="checkbox" checked={this.state.hasMedication} onChange={this.handleMedication}/>
                           Mediaction
                         </label>
                       </div>
                     </div>
                   </div>
                  </div>
                  <button className="btn btn-warning btn-sm">Submit</button>
                </form>
                {this.props.consumer.loading ? <Spinner /> : null}
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
    consumer : state.consumer
  }
}
export default connect(mapStateToProps,{getConsumer,updateConsumer})(EditConsumer);
