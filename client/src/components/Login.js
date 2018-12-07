import React from 'react';
import { connect} from 'react-redux';
import classnames from 'classnames';
import { userLogin } from '../actions';
import Spinner from './Spinner';

class Login extends React.Component {
  state = {
    email : '',
    password : '',
    emailError : '',
    passwordError : ''
  }
  handleEmail = (e) => {
    this.setState({ email : e.target.value},() => {this.validateEmail()});
  }
  handlePassword = (e) => {
    this.setState({ password : e.target.value},() => { this.validatePassword()});
  }
  validateEmail = () => {
    let { email } = this.state;
    let emailError;
    if(email === ''){
    emailError = 'Email is required.'
    }
    this.setState({ emailError })
    return !emailError;
  }
  validatePassword = () => {
    let { password } = this.state;
    let passwordError;
    if(password === ''){
      passwordError = 'Password is required.';
    }
    this.setState({ passwordError});
    return !passwordError;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const validEmail = this.validateEmail();
    const validPassword = this.validatePassword();
    if(validEmail && validPassword){
      const userData = {
        email : this.state.email,
        password : this.state.password
      }
      this.props.userLogin(userData,this.props.history)
    }
  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/');
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated === true){
      this.props.history.push('/');
    }
  }
  render() {
    console.log(this.props.auth)
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <h3 className="text-center"><b>Transporter,Inc</b></h3>
            <p className="text-center"><em>Login to access your accopunt</em></p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            {
              this.props.auth.error.success === false ? <p className="alert alert-danger">{this.props.auth.error.msg}</p> : null
            }
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <form onSubmit={this.handleSubmit}>
              <div className={classnames('form-group',{ 'has-error' : this.state.emailError})}>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleEmail}
                />
              <span className="help-block">{this.state.emailError}</span>
              </div>
              <div className={classnames('form-group',{'has-error': this.state.passwordError})}>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handlePassword}
                 />
              <span className="help-block">{this.state.passwordError}</span>
              </div>
              <button className="btn btn-primary btn-sm">Submit</button>
            </form>
            <div>
              {
                this.props.auth.loading ? <Spinner /> : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    auth : state.auth
  }
}
export default connect(mapStateToProps,{userLogin})(Login);
