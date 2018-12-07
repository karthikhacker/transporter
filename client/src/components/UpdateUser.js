import React, {PropTypes} from 'react';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { getUser,updateUser } from '../actions';

class UpdateUser extends React.Component {
  state = {
    _id : this.props.match.params.id,
    email : '',
    role : ''
  }
  handleEmail = (e) => {
    this.setState({ email : e.target.value });
  }
  handleRole = (e) => {
    this.setState({ role : e.target.value});
  }
  componentWillMount(){
    this.props.getUser(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps){
    let user = nextProps.user.user;
    this.setState({
       _id : user._id,
       email : user.email,
       role : user.role
    })
    if(nextProps.user.user.success === true){
      this.props.history.push('/users');
    }
    if(nextProps.auth.user.role === 'user'){
      this.props.history.push('/');
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email : this.state.email,
      role : this.state.role
    }
    console.log(userData);
    this.props.updateUser(userData,this.props.match.params.id);
  }
  render() {
    console.log(this.props.user);
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h4 className="text-center">Update User</h4>
              </div>
              <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      defaultValue={this.state.email}
                      onChange={this.handleEmail}
                    />
                  </div>
                  <div className="form-group">
                    <select className="form-control" defaultValue={this.state.role}  onChange={this.handleRole}>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <button className="btn btn-success btn-sm">Submit</button>
                </form>
                {this.props.user.loading ? <Spinner /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    auth : state.auth,
    user : state.user
  }
}
export default connect(mapStateToProps,{ getUser, updateUser })(UpdateUser);
