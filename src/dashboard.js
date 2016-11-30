import React from 'react';
import auth from './auth';

class Dashboard extends React.Component {
  componentDidMount() {
    if (auth.loggedIn()){
      console.log('granted');
    } else {
      this.props.router.replace('/');
    }
  }
  render() {
    return (
      <div>
        Dashboard!
      </div>
    )
  }
}

module.exports = Dashboard;
