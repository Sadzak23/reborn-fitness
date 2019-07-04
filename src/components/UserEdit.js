import React from 'react';
import { connect } from 'react-redux';
import { colorMapGender } from './ColorMap';
import { Birthdate } from './Birthdate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFemale, faMale } from '@fortawesome/free-solid-svg-icons';

export class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    const name = this.props.auth.userName.split(" ")
    this.state = {
      firstName: name[0],
      lastName: name[name.length - 1],
      weight: 70,
      height: 23,
      gender: 'male',
      birthdate: {
        date: '',
        day: '1',
        month: '1',
        year: '1990',
      },
    };
  };

  // Name
  onFirstNameChange = (e) => {
    const firstName = e.target.value;
    this.setState({ firstName });
  };
  onLastNameChange = (e) => {
    const lastName = e.target.value;
    this.setState({ lastName });
  };

  // Height & Weight
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

  // Birthdate
  onBirthdateChange = (birthdate) => {
    this.setState({ birthdate })
  }

  // Gender
  onGenderChange = () => {
    const gender = this.state.gender === "male" ? "female" : "male";
    this.setState({ gender });
  };

  onSubmit = () => {
    // Validate Birthdate from Birthdate.js
    this.refs.child.validateBirthdate();

  };

  render() {
    const genderColor = this.state.gender === "male" ? `${Object.keys(colorMapGender)[0]}` : `${Object.keys(colorMapGender)[1]}`
    const genderPrefix = this.state.gender === "male" ? "Sir " : "Lady "
    return (
      <div>
        <div className="content-container form">
          <h2>Hello {genderPrefix} {this.props.auth.userName.split(" ")[0]}</h2>
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

          <button className="btn-save" onClick={this.onSubmit}>Update</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);