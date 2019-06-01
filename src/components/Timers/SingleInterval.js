import React from 'react';

const SingleInterval = ( {onRemove, id, intervalName, intervalMin, intervalColor, intervalSec, intervalType, }) => {
  const onRemoveInterval = () => {
    onRemove(id)
  }
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
      <button onClick={onRemoveInterval}>X</button>
    </div>
  </div>
)};

export default SingleInterval;