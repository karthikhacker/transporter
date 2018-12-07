import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            Home
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
export default connect(mapStateToProps)(Home);
