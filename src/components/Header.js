import React from 'react';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';

const toggle = () => {
  const toggle = document.getElementById("logout");
  if (toggle.style.display === "block") {
    toggle.style.display = "none";
  } else {
    toggle.style.display = "block";
  }
};

export const Header = ({ startLogout, userName, userPhoto }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard" onMouseDown={(e) => {e.preventDefault()}}>
          <img className="header__img" src="images/logo-header.png" alt="Reborn Fitness" />
        </Link>
        <a className="avatar" onClick={toggle}>
          <div id="logout">
            <p>{userName}</p>
            <button className="btn-logout" onClick={startLogout}>Logout</button>
          </div>
          <img title={userName} className="avatar__img" src={userPhoto} />
        </a>
      </div>
    </div>
  </header>
);

const mapStateToProps = (state) => ({
  userName: state.auth.userName,
  userPhoto: state.auth.userPhoto
});
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
