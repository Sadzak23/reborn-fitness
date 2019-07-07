import React from 'react';
import * as moment from 'moment';

export class Birthdate extends React.Component {
  constructor(props) {
    super(props);
    const birthdate = moment(props.birthdate).format('D M YYYY').split(' ')
    this.state = {
      date: '',
      day: birthdate[0],
      month: birthdate[1],
      year: birthdate[2],
    }
  };

  onDayChange = (e) => {
    const day = e.target.value;
    if (!day || day.match(/^\d{1,2}$/)) {
      this.setState({ day }, () => {
        this.setState({ date: Date.parse(`${this.state.month} ${this.state.day} ${this.state.year}`) }, () => {
          this.props.onBdayChange(this.state.date)
        })
      });
    }
  };
  onMonthChange = (e) => {
    const month = e.target.value;
    if (!month || month.match(/^\d{1,2}$/)) {
      this.setState({ month }, () => {
        this.setState({ date: Date.parse(`${this.state.month} ${this.state.day} ${this.state.year}`) }, () => {
          this.props.onBdayChange(this.state.date)
        })
      });
    }
  };
  onYearChange = (e) => {
    const year = e.target.value;
    if (!year || year.match(/^\d{1,4}$/)) {
      this.setState({ year }, () => {
        this.setState({ date: Date.parse(`${this.state.month} ${this.state.day} ${this.state.year}`) }, () => {
          this.props.onBdayChange(this.state.date)
        })
      });
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