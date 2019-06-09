import React from 'react';

const SingleInterval = ( {onRemove, onEdit, id, intervalName, intervalMin, intervalColor, intervalSec, intervalType, }) => {
  const onRemoveInterval = () => {
    onRemove(id)
  };
  const onEditInterval = () => {
    onEdit(id, intervalName, intervalMin, intervalSec, intervalType, intervalColor)
  };
return (
  <div className="list-item">
    <div className="list-int">
      <h3>{intervalName}</h3>
      <p>{intervalType} - {intervalColor}</p>
    </div>
    <h3 className="list-duration">{intervalMin}:{
      intervalSec < 10 ? "0" + intervalSec : intervalSec
    }</h3>
    <div>
      <button onClick={onEditInterval}>Edit</button>
      <button onClick={onRemoveInterval}>X</button>
    </div>
  </div>
)};

export default SingleInterval;