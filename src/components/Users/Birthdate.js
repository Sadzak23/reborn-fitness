import React from 'react';

export class Birthdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      day: '1',
      month: '1',
      year: '1990',
    }
  };

  onDayChange = (e) => {
    const day = e.target.value;
    if (!day || day.match(/^\d{1,2}$/)) {
      this.setState({ day });
    }
  };
  onMonthChange = (e) => {
    const month = e.target.value;
    if (!month || month.match(/^\d{1,2}$/)) {
      this.setState({ month });
    }
  };
  onYearChange = (e) => {
    const year = e.target.value;
    if (!year || year.match(/^\d{1,4}$/)) {
      this.setState({ year });
    }
  };

  validateBirthdate = () => {
    const date = Date.parse(`${this.state.month} ${this.state.day} ${this.state.year}`)
    const now = new Date()
    if (date && date < now) {
      this.props.onBdayChange(date)
    } else if (date && date > now) {
      swal({
        title: "WOW! You're from future!",
        text: "Please enter valid birthdate",
        icon: "error",
        buttons: {
          ok: {
            text: "Ok!",
            className: "btn-alert-delete"
          },
        },
      })
    } else {
      swal({
        title: "Birthdate invalid!",
        text: "Please enter valid birthdate",
        icon: "error",
        buttons: {
          ok: {
            text: "Ok!",
            className: "btn-alert-delete"
          },
        },
      })
    }
  };

  render() {
    return (
      <div className="text-input fit-content">
        Birthdate: <label className="margin-right fit-content">
          day: <input type="text" onChange={this.onDayChange} className="inline-input2" value={this.state.day} />
        </label>
        <label className="margin-right fit-content">
          month: <input type="text" onChange={this.onMonthChange} className="inline-input2" value={this.state.month} />
        </label>
        <label className="margin-right fit-content">
          year: <input type="text" onChange={this.onYearChange} className="inline-input4" value={this.state.year} />
        </label>
      </div>
    )
  };
};