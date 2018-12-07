import React, {PropTypes} from 'react';
import classnames from 'classnames';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { addUser } from '../actions';

class AddUser extends React.Component {
  state = {
    email : '',
    password : '',
    role : 'user',
    emailError : '',
    passwordError : ''
  }
  handleEmail = (e) => {
    this.setState({ email : e.target.value }, () => {this.validateEmail()});
  }
  handlePassword = (e) => {
    this.setState({ password : e.target.value},() => {this.validatePassword()});
  }
  handleRole = (e) => {
    this.setState({ role : e.target.value });
  }
  validateEmail = () => {
    let { email } = this.state;
    let emailError;
    if(email === ''){
      emailError = 'Email is required!.';
    }
    this.setState({ emailError });
    return !emailError;
  }
  validatePassword = () => {
    let { password } = this.state;
    let passwordError;
    if(password === ''){
      passwordError = 'Password is required !.';
    }
    this.setState({ passwordError });
    return !passwordError;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const validEmail = this.validateEmail();
    const validPassword = this.validatePassword();
    if(validEmail && validPassword){
      const userData = {
        email : this.state.email,
        password : this.state.password,
        role : this.state.role
      }
      this.props.addUser(userData);
      this.setState({
         email : '',
         password : ''
      })
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.auth.user.role === 'user'){
      this.props.history.push('/');
    }
    if(nextProps.user.user.success === true){
      this.props.history.push('/users');
    }
  }
  render() {
    console.log(this.props.user);
    const { error } = this.props.user;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <h4 className="text-center">Add User</h4>
          </div>
          <div className="col-sm-4 col-sm-offset-4">
            { error.success === false ? <p className="alert alert-danger">{error.msg}</p> : null }
          </div>
          <div className="col-sm-4 col-sm-offset-4">
            <form onSubmit={this.handleSubmit}>
              <div className={classnames('form-group',{'has-error' : this.state.emailError})}>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleEmail}
                />
              <span className="help-block">{this.state.emailError}</span>
              </div>
              <div className={classnames('form-group',{'has-error' : this.state.passwordError})}>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handlePassword}
                />
              <span className="help-block">{this.state.passwordError}</span>
              </div>
              <div className="form-group">
                <select className="form-control" value={this.state.role} onChange={this.handleRole}>
                  <option>User</option>
                  <option>Admin</option>
                </select>
              </div>
              <button className="btn btn-success btn-sm">Submit</button>
            </form>
            {this.props.user.loading ? <Spinner /> : null }
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    user : state.user,
    auth : state.auth
  }
}
export default connect(mapStateToProps,{ addUser })(AddUser);
