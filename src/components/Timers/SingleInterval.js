import React from 'react';
import { colorMap } from '../ColorMap';

const SingleInterval = ({ onRemove, onEdit, id, intervalName, intervalMin, intervalColor, intervalSec, intervalType, }) => {
  const onRemoveInterval = () => {
    onRemove(id)
  };
  const onEditInterval = () => {
    onEdit(id, intervalName, intervalMin, intervalSec, intervalType, intervalColor)
  };
  
  return (
    <div className="list-item">
      <div className="list-int">
        <h3>{intervalMin}:{intervalSec < 10 ? "0" + intervalSec : intervalSec} - {intervalName}</h3>
        <p>{intervalType} - {colorMap[intervalColor]}</p>
      </div>
      <div>
        <button onClick={onEditInterval}>Edit</button>
        <button className="btn-remove" onClick={onRemoveInterval}>X</button>
      </div>
    </div>
  )
};

export default SingleInterval;