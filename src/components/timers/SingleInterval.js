import React from 'react';
import { colorMap } from '../Elements/ColorMap';
import { ListItemBtns } from '../Elements/List';
import { onReorder } from '../Elements/Alerts';

const SingleInterval = ({ onRemove, onEdit, intervals, id, intervalName, intervalMin, intervalColor, intervalSec, intervalType, intervalIndex, editingClass }) => {
  const onRemoveInterval = () => {
    onRemove(id)
  };
  const onEditInterval = () => {
    onEdit(id, intervalName, intervalMin, intervalSec, intervalType, intervalColor)
  };
  const onSortIntervals = () => onReorder(intervals, intervalIndex, intervalName, onEditInterval)

  return (
    <div className={`list-item ${editingClass}`}>
      <div className="list-int">
      <div className="list-int-color" style={{background: intervalColor}}></div>
        <div>
          <h3>{intervalMin}:{intervalSec < 10 ? "0" + intervalSec : intervalSec} - {intervalName}</h3>
          <p>{intervalType} - {colorMap[intervalColor]}</p>
        </div>
      </div>
      <ListItemBtns
        onEdit={onEditInterval}
        //onSort={onSortIntervals}
        onRemove={onRemoveInterval}
        iconSize="s"
        />
    </div>
  )
};

export default SingleInterval;
