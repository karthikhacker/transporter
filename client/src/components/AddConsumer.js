import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { addConsumer } from '../actions';

class AddConsumer extends React.Component {
  state = {
    name : '',
    sex : '',
    address : '',
    phone : '',
    notes : '',
    hasWheelChair : false,
    needsWave : false,
    hasSeizures : false,
    needTwoSeats : false,
    behavioralIssues : false,
    hasMedication : false,
    nameError : '',
    sexError : '',
    addressError : '',
    phoneError : ''
  }
  handleName = (e) => {
    this.setState({ name : e.target.value }, () => {this.validateName()});
  }
  handleSex = (e) => {
    this.setState({ sex : e.target.value }, () => {this.validateSex()});
  }
  handleAddress = (e) => {
    this.setState({ address : e.target.value  },() => {this.validateAddress()});
  }
  handlePhone = (e) => {
    this.setState({ phone : e.target.value },() => {this.validatePhone()});
  }
  handleNotes = (e) => {
    this.setState({ notes : e.target.value });
  }
  handleWheelchair = (e) => {
    this.setState({ hasWheelChair : !this.state.hasWheelChair });
  }
  handleNeedswave = (e) => {
    this.setState({ needsWave : !this.state.needsWave });
  }
  handleSeizures = (e) => {
    this.setState({ hasSeizures : !this.state.hasSeizures });
  }
  handleBehavioralissues = (e) => {
    this.setState({ behavioralIssues : !this.state.behavioralIssues });
  }
  handleMedication = (e) => {
    this.setState({ hasMedication : !this.state.hasMedication })
  }
  handleTwoseats = (e) => {
    this.setState({ needTwoSeats : !this.state.needTwoSeats });
  }
  validateName = () => {
    let { name } = this.state;
    let nameError;
    if(name === ''){
      nameError = 'Name is required';
    }
    this.setState({ nameError });
    return !nameError;
  }
  validateSex = () => {
    let { sex } = this.state;
    let sexError;
    if(sex === ''){
      sexError = 'Sex is required';
    }
    this.setState({sexError})
    return !sexError;
  }
  validateAddress = () => {
    let { address } = this.state;
    let addressError;
    if(address === ''){
      addressError = 'Address is required.'
    }
    this.setState({addressError});
    return !addressError;
  }
  validatePhone = () => {
    let { phone } = this.state;
    let phoneError;
    if(phone === ''){
      phoneError = 'Phone is required';
    }
    this.setState({phoneError});
    return !phoneError;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const validName = this.validateName();
    const validSex = this.validateSex();
    const validAddress = this.validateAddress();
    const validPhone = this.validatePhone();
    if(validName || validSex || validAddress || validPhone){
      let consumerData = {
        name : this.state.name,
        sex : this.state.sex,
        address : this.state.address,
        phone : this.state.phone,
        notes : this.state.notes,
        hasWheelChair : this.state.hasWheelChair,
        needsWave : this.state.needsWave,
        hasSeizures : this.state.hasSeizures,
        needTwoSeats : this.state.needTwoSeats,
        behavioralIssues : this.state.behavioralIssues,
        hasMedication : this.state.hasMedication
      }
      console.log(consumerData);
      this.props.addConsumer(consumerData);
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.consumer.consumer.success === true){
      this.props.history.push('/consumers');
    }
  }
  render() {
    console.log(this.props.consumer);

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-sm-offset-4">
            <h3>Add Consumer</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-sm-4">
                  <div className={classnames('form-group',{ 'has-error' : this.state.nameError })}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.handleName}
                    />
                    <span className="help-block">{this.state.nameError}</span>
                  </div>
                  <div className={classnames('form-group',{'has-error' : this.state.sexError })}>
                    <select className="form-control" value={this.state.sex} onChange={this.handleSex}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <span className="help-block">{this.state.sexError}</span>
                  </div>
                  <div className={classnames('form-group',{'has-error' : this.state.addressError})}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      value={this.state.address}
                      onChange={this.handleAddress}
                     />
                    <span className="help-block">{this.state.addressError}</span>
                  </div>
                  <div className={classnames('form-group',{'has-error' : this.state.phoneError})}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone"
                      value={this.state.phone}
                      onChange={this.handlePhone}
                    />
                  <span className="help-block">{this.state.phoneError}</span>
                  </div>
                  <div className="from-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Notes"
                      value={this.state.notes}
                      onChange={this.handleNotes}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox"  value={this.state.hasWheelChair} onChange={this.handleWheelchair} />
                      Wheelchair
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" value={this.state.needsWave} onChange={this.handleNeedswave} />
                      Needswave
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" value={this.state.hasSeizures} onChange={this.handleSeizures}/>
                      Seizures
                    </label>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" onChange={this.handleTwoseats}/>
                      Twoseats
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" onChange={this.handleBehavioralissues} />
                      behavioral issues
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" onChange={this.handleMedication}/>
                      Medication
                    </label>
                  </div>
                </div>
              </div>
              <button className="btn btn-success btn-sm">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    consumer : state.consumer
  }
}
export default connect(mapStateToProps,{addConsumer})(AddConsumer);
