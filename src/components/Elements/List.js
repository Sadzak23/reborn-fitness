import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSort, faTimes } from '@fortawesome/free-solid-svg-icons';
import { add0 } from './ExportFunctions';

export const ListHeader = ({
  titleIcon,
  titleTxt,
  linkTxt,
  linkPath,
  linkState,
  linkIcon
}) => (
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
        <div className="flex">
          {linkTxt && <p className="margin-right">{linkTxt}</p>}
          <FontAwesomeIcon icon={linkIcon} style={{ color: '#fff' }} size="2x" />
        </div>

      </Link>
    </div>
  );

export const ListBody = ({ list, className = "list-body" }) =>
  <div className={className}>{list}</div>

export const ListBodyLinks = ({ list }) => {
  return list.map(link => (
    <Link
      className="list-dashboard"
      to={{
        pathname: link.linkPath,
        state: link.linkState
      }}
      onMouseDown={(e) => { e.preventDefault() }}
      key={link.text}
    >
      <FontAwesomeIcon icon={link.icon} /> {link.text}
    </Link>
  )
  )
};

export const ListFooter = () => <div className="list-footer"></div>

// List items

export const ListItemIndex = ({ index }) =>
  <h3 className="list-index">{add0(index + 1)}.</h3>

export const ListItemTitle = ({ linkPath, title, subtitle }) => (
  <div className="list-int list-userName">
    <Link to={linkPath} className="list-item-link" onMouseDown={(e) => { e.preventDefault() }}>
      <h3>{title}</h3>
      {subtitle && <p>{subtitle}</p>}
    </Link>
  </div>
)

export const ListItemBtns = ({
  editLink,
  onSort,
  onRemove,
  editIcon = faPen,
  sortIcon = faSort,
  removeIcon = faTimes
}) => (
    <div className="list-item-btns">
      {/* Edit button */}
      <Link to={editLink} onMouseDown={(e) => { e.preventDefault() }}>
        <button className="btn-edit-m">
          <FontAwesomeIcon icon={editIcon} />
        </button>
      </Link>
      {/* Sort button */}
      <button
        className="btn-edit-m"
        onClick={onSort}
      >
        <FontAwesomeIcon icon={sortIcon} size="lg" />
      </button>
      {/* Delete button */}
      <button className="btn-remove-m" onClick={onRemove}>
        <FontAwesomeIcon icon={removeIcon} />
      </button>
    </div>
  )