import React from 'react';
import { colorMapGender } from '../ColorMap';
import { Birthdate } from './Birthdate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFemale, faMale } from '@fortawesome/free-solid-svg-icons';

export class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      weight: 0,
      height: 0,
      gender: 'male',
      birthdate: '',
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
  
  onGenderChange = () => {
    const gender = this.state.gender === "male" ? "female" : "male";
    this.setState({ gender });
  };

  onCreateUser = () => {
    // Validate Birthdate from Birthdate.js
    this.refs.child.validateBirthdate();
    
    
    ///////////////////////////////////////////////////    Kako drugacije ovo da se sredi???    /////////////////////////////////////////////////////////////
    setTimeout(() => {
      this.props.onAddUser({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        birthdate: this.state.birthdate,
        height: this.state.height,
        weight: this.state.weight,
        gender: this.state.gender
      })      
    }, 500);
  };

  render() {
    const genderColor = this.state.gender === "male" ? `${Object.keys(colorMapGender)[0]}` : `${Object.keys(colorMapGender)[1]}`
    const genderPrefix = this.state.gender === "male" ? "Sir " : "Lady "
    return (
      <div>
        <div className="content-container form">
          <h2>Hello {genderPrefix} {this.state.firstName}</h2>
          <div className="form-header">
            <div>
              <input type="text" onChange={this.onFirstNameChange} className="margin-right-input" id="firstName" placeholder="First Name" />
              <input type="text" onChange={this.onLastNameChange} className="text-input" id="lastName" placeholder="Last Name" />
            </div>
          </div>
          <Birthdate
            ref="child"
            onBdayChange={this.onBirthdateChange}
          />
          <div className="flex">
            <label className="margin-right-input fit-content">
              Weight: <input type="text" onChange={this.onWeightChange} className="inline-input" id="bodyWeight" value={this.state.weight} /> kg
            </label>
            <label className="text-input fit-content">
              Height: <input type="text" onChange={this.onHeightChange} className="inline-input" id="bodyHeight" value={this.state.height} /> cm
            </label>
          </div>

          <div className="gender-label">
            Gender:
        <button
              className="btn-gender"
              onClick={this.onGenderChange}
              style={{ background: genderColor }}
            >
              {this.state.gender === "male" ? <FontAwesomeIcon icon={faMale} size='3x' color="#fff" /> : <FontAwesomeIcon icon={faFemale} size='3x' color="#fff" />}
            </button>
          </div>

          <button className="btn-save" onClick={this.onCreateUser}>Create New User</button>
        </div>
      </div>
    );
  }
};