import React from 'react';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';
import { firebase } from '../firebase/firebase'

const user = firebase.auth().onAuthStateChanged((user) => {
  // if (user) {
    //   return user
    // }
  console.log(user.displayName)
  return user.displayName.toString()
});

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
        <img className="header__img" src="/images/logo-header.png" alt="Reborn Fitness" />
        </Link>
        <h1>p + {user()}</h1>
        <button className="btn-logout" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});
export default connect(undefined, mapDispatchToProps)(Header);
