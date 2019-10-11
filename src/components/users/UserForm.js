import React from 'react';
import Swal from 'sweetalert2';
import { userFormAlerts } from '../Alerts';
import { Birthdate } from './Birthdate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFemale, faMale, faSave, faUserPlus, faBan } from '@fortawesome/free-solid-svg-icons';
import { history } from '../../routers/AppRouter';

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: props.user ? props.user.firstName : '',
      lastName: props.user ? props.user.lastName : '',
      weight: props.user ? props.user.weight : "",
      height: props.user ? props.user.height : "",
      gender: props.user ? props.user.gender : 'male',
      birthdate: props.user ? props.user.birthdate : "",
      activeUser: props.user ? props.user.activeUser : false
    };
  };

  onFirstNameChange = (e) => {
    const firstName = e.target.value;
    this.setState({ firstName });
  };
  onLastNameChange = (e) => {
    const lastName = e.target.value;
    this.setState({ lastName });
  };

  onWeightChange = (e) => {
    const weight = e.target.value;
    if (!weight || weight.match(/^\d{1,3}$/)) {
      this.setState({ weight });
    };
  };

  onHeightChange = (e) => {
    const height = e.target.value;
    if (!height || height.match(/^\d{1,3}$/)) {
      this.setState({ height });
    };
  };

  onBirthdateChange = (birthdate) => {
    this.setState({ birthdate })
  }

  onGenderMale = () => {
    this.setState({ gender: "male" });
    document.getElementById("btn-female").classList.remove("female-active")
    document.getElementById("btn-male").classList.add("male-active")
  };

  onGenderFemale = () => {
    this.setState({ gender: "female" });
    document.getElementById("btn-male").classList.remove("male-active")
    document.getElementById("btn-female").classList.add("female-active")
  };

  onCreateUser = () => {
    const onCreate = () => this.props.onAddUser({
      firstName: this.state.firstName, 
      lastName: this.state.lastName,
      birthdate: this.state.birthdate,
      height: this.state.height,
      weight: this.state.weight,
      gender: this.state.gender,
      activeUser: false,
      workouts: {
        history: ""
      }
    })
    userFormAlerts(
      this.state.firstName, 
      this.state.lastName,
      this.state.birthdate,
      this.state.height,
      this.state.weight,
      this.state.gender,
      onCreate
    )
  };

  onEditUser = () => {
    const onEdit = () => this.props.onEditUser(this.props.user.id, {
      firstName: this.state.firstName, 
      lastName: this.state.lastName,
      birthdate: this.state.birthdate,
      height: this.state.height,
      weight: this.state.weight,
      gender: this.state.gender
    })
    userFormAlerts(
      this.state.firstName, 
      this.state.lastName,
      this.state.birthdate,
      this.state.height,
      this.state.weight,
      this.state.gender,
      onEdit
    )
  };

  onCancel = () => {
    history.goBack();
  };

  render() {
    const background = this.state.gender === "male" ? "#bae0ff" : "#f5ccd3";
    return (
      <div>
        <div className="user-form" style={{ background }}>
          {this.state.firstName ? <h2>Welcome {this.state.firstName}</h2> : <h2>Please enter user data</h2>}
          <div className="flex">
            <input
              id="firstName"
              type="text"
              onChange={this.onFirstNameChange}
              autoComplete="off"
              className="margin-right text-input full-width"
              placeholder="First Name"
              value={this.state.firstName}
            />
            <input
              id="lastName"
              type="text"
              onChange={this.onLastNameChange}
              autoComplete="off"
              className="text-input full-width"
              placeholder="Last Name"
              value={this.state.lastName}
            />
          </div>
          <Birthdate
            birthdate={this.state.birthdate}
            ref="child"
            onBdayChange={this.onBirthdateChange}
          />
          <div className="flex">
            <label className="text-input full-width margin-right">
              Weight: <input
                type="text"
                onChange={this.onWeightChange}
                autoComplete="off"
                className="inline-input"
                placeholder="0"
                value={this.state.weight} /> kg
            </label>
            <label className="text-input full-width">
              Height: <input
                type="text"
                onChange={this.onHeightChange}
                autoComplete="off"
                className="inline-input"
                placeholder="0"
                value={this.state.height} /> cm
            </label>
          </div>
          <div className="text-center">Choose Gender:
            <div className="flex-center">
              <button
                className={`btn-gender ${this.state.gender === "male" ? "male-active" : ""}`}
                onClick={this.onGenderMale}
                id="btn-male"
              >
                <FontAwesomeIcon icon={faMale} size='3x' />
              </button>
              <button
                className={`btn-gender ${this.state.gender === "female" ? "female-active" : ""}`}
                onClick={this.onGenderFemale}
                id="btn-female"
              >
                <FontAwesomeIcon icon={faFemale} size='3x' />
              </button>
            </div>
          </div>
        </div>
        <div className="form-submit">
          {!this.props.user ?
            <button className="btn-save" onClick={this.onCreateUser}>
              <FontAwesomeIcon icon={faUserPlus} /> Create New User</button> :
            <button className="btn-save" onClick={this.onEditUser}>
              <FontAwesomeIcon icon={faSave} /> Save Changes
              </button>}
          <button className="btn-cancel form-cancel" onClick={this.onCancel}>
            <FontAwesomeIcon icon={faBan} /> Cancel
              </button>
        </div>
      </div>
    );
  }
};
