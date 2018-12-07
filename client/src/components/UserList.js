import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { getUsers, deleteUser } from '../actions';
import Spinner from './Spinner';

 class UserList extends React.Component {
   state = {
     email : '',
     password : '',
     role : 'user',
     emailError : '',
     passwordError : ''
   }
   handleEmail = (e) => {
     this.setState({ email : e.target.value}, () => {this.validateEmail()});
   }
   handlePassword = (e) => {
     this.setState({ password : e.target.value}, () => {this.validatePassword()})
   }
   handleRole = (e) => {
     this.setState({ role : e.target.value });
   }
   validateEmail = () => {
     let { email } = this.state;
     let emailError;
     if(email === ''){
       emailError = 'Email is required';
     }
     this.setState({emailError});
     return !emailError;
   }
   validatePassword = () => {
     let { password } = this.state;
     let passwordError;
     if(password === ''){
       passwordError = 'password is required.';
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
     }
   }
   componentDidMount(){
     this.props.getUsers();
   }
  componentWillReceiveProps(nextProps){
    if(nextProps.auth.user.role === 'user'){
      this.props.history.push('/');
    }
  }
  onDelete = (id) => {
    this.props.deleteUser(id);
    console.log(id);
  }
  render() {
    console.log(this.props.user);
    let { user, loading } = this.props.user;
    let renderUser;
    if(user === null || loading){
      renderUser = <Spinner />
    }else{
      renderUser = (
         <table className="table">
           <thead>
             <tr>
               <th>Email</th>
               <th>Role</th>
               <th>Actions</th>
             </tr>
          </thead>
          <tbody>
            {
               user.length > 0 ? user.map((user,id) => (
                 <tr key={id}>
                   <td>{user.email}</td>
                   <td>{user.role}</td>
                   <td>
                     <Link to={`/update/${user._id}`} className="btn btn-success btn-sm action-btn">Edit role</Link>
                     <button onClick={() => this.onDelete(user._id)} className="btn btn-danger btn-sm action-btn">Delete</button>
                   </td>
                 </tr>
               )) : null
            }
          </tbody>
         </table>
      )
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h4 className="text-center"><em>Users</em></h4>
              </div>
              <div className="panel-body">
                {renderUser}
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
export default connect(mapStateToProps,{getUsers, deleteUser})(UserList);
