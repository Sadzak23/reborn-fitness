import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { history } from '../../routers/AppRouter';

const onGoBack = () => {
  history.goBack();
};

export const BtnConfirmCancel = ({
  confirmFn,
  confirmTxt = "Confirm",
  confirmIcon,
  cancelTxt = "Cancel",
  cancelFn = onGoBack
}) => (
    <div className="form-submit">
      <button className="btn-confirm" onClick={confirmFn}>
        <FontAwesomeIcon icon={confirmIcon} /> {confirmTxt}
      </button>
      <button className="btn-cancel form-cancel" onClick={cancelFn}>
        <FontAwesomeIcon icon={faBan} /> {cancelTxt}
      </button>
    </div>
  );

export const BtnBackFullWidth = () => (
  <button className="btn-confirm" onClick={onGoBack}>
    <FontAwesomeIcon icon={faHandPointLeft} /> Back
    </button>
);

export const BtnLink = ({ text, linkPath, state, icon }) => (
  <Link to={{
    pathname: linkPath,
    state: state
  }}>
    <button className="btn-confirm">
      <FontAwesomeIcon icon={icon} /> {text}
    </button>
  </Link>
);

export const BtnLinkCancel = ({
  linkTxt,
  linkPath,
  linkState,
  linkIcon,
  cancelTxt = "Cancel",
  cancelFn = onGoBack
}) => (
    <div className="form-submit">
      <Link to={{
        pathname: linkPath,
        state: linkState
      }} style={{ width: "100%" }}>
        <button className="btn-confirm">
          <FontAwesomeIcon icon={linkIcon} /> {linkTxt}
        </button>
      </Link>
      <button className="btn-cancel form-cancel" onClick={cancelFn}>
        <FontAwesomeIcon icon={faBan} /> {cancelTxt}
      </button>
    </div>
  );