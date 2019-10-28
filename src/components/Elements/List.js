import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ListHeader = ({ titleIcon, titleTxt, linkPath, linkState, linkIcon }) => {
  return (
    <div className="list-header">
      <div className="flex">
        <FontAwesomeIcon icon={titleIcon} size="2x" className="margin-right" />
        <h2> {titleTxt}</h2>
      </div>
      <Link
        to={{
          pathname: linkPath,
          state: linkState
        }}
        onMouseDown={(e) => { e.preventDefault() }}
      >
        <FontAwesomeIcon icon={linkIcon} style={{ color: '#fff' }} size="2x" />
      </Link>
    </div>
  )
};

export const ListBody = ({ list }) => {
  return (
    <div className="list-body">
      {list}
    </div>
  )
};

export const ListFooter = () => {
  return <div className="list-footer"></div>
};