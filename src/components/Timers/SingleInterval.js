import React from 'react';

const SingleInterval = ({ onRemove, onEdit, id, intervalName, intervalMin, intervalColor, intervalSec, intervalType, }) => {
  const onRemoveInterval = () => {
    onRemove(id)
  };
  const onEditInterval = () => {
    onEdit(id, intervalName, intervalMin, intervalSec, intervalType, intervalColor)
  };
  const colorFn = () => {
    switch (intervalColor) {
      case "#63d313":
        return "Green";
      case "#2bd99f":
        return "Mint";
      case "#cccccc":
        return "Gray";
      case "#e62222":
        return "Red";
      case "#1dc4f2":
        return "Blue";
    }
  };
  const color = colorFn();

  return (
    <div className="list-item">
      <div className="list-int">
        <h3>{intervalMin}:{intervalSec < 10 ? "0" + intervalSec : intervalSec} - {intervalName}</h3>
        <p>{intervalType} - {color}</p>
      </div>
      <div>
        <button onClick={onEditInterval}>Edit</button>
        <button onClick={onRemoveInterval}>X</button>
      </div>
    </div>
  )
};

export default SingleInterval;