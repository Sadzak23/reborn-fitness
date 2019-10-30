import React from 'react';
import { colorMap } from '../Elements/ColorMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';

const SingleInterval = ({ onRemove, onEdit, id, intervalName, intervalMin, intervalColor, intervalSec, intervalType, editingClass }) => {
  const onRemoveInterval = () => {
    onRemove(id)
  };
  const onEditInterval = () => {
    onEdit(id, intervalName, intervalMin, intervalSec, intervalType, intervalColor)
  };

  return (
    <div className={`list-item ${editingClass}`}>
      <div className="list-int">
      <div className="list-int-color" style={{background: intervalColor}}></div>
        <div>
          <h3>{intervalMin}:{intervalSec < 10 ? "0" + intervalSec : intervalSec} - {intervalName}</h3>
          <p>{intervalType} - {colorMap[intervalColor]}</p>
        </div>
      </div>
      <div>
        <button className="btn-edit-s" onClick={onEditInterval}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button className="btn-remove-s" onClick={onRemoveInterval}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  )
};

export default SingleInterval;
