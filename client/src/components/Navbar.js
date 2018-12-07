import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';

 class Navbar extends React.Component {
   onLogout = () => {
     this.props.logoutUser();
   }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const userLink = (
      <nav className="navbar navbar-inverse ">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/" className="navbar-brand">Transporter Inc</Link>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/consumers">Consumers</Link></li>
              { user.role == 'admin' ? <li><Link to="/users">Users</Link></li> : null }
              {user.role == 'admin' ? <li><Link to="/adduser">Add User</Link></li> : null }
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a>{user.email}</a></li>
              <li><a onClick={this.onLogout}>Logout</a></li>
            </ul>
          </div>{/*/.nav-collapse */}
        </div>
      </nav>
    )

    return (
       <div className="main">
          {isAuthenticated ? userLink : null }
       </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    auth : state.auth
  }
}
export default connect(mapStateToProps,{logoutUser})(Navbar);
