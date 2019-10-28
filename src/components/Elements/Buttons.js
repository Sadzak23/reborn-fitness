import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { history } from '../../routers/AppRouter';

const onGoBack = () => {
  history.goBack();
};

export const BtnConfirmCancel = ({ confirmFn, confirmTxt = "Confirm", confirmIcon, cancelTxt = "Cancel", cancelFn = onGoBack }) => {

  return (
    <div className="form-submit">
      <button className="btn-confirm" onClick={confirmFn}>
        <FontAwesomeIcon icon={confirmIcon} /> {confirmTxt}
      </button>
      <button className="btn-cancel form-cancel" onClick={cancelFn}>
        <FontAwesomeIcon icon={faBan} /> {cancelTxt}
      </button>
    </div>
  )
};

export const BtnBackFullWidth = () => {
  return (
    <button className="btn-confirm margin-top" onClick={onGoBack}>
      <FontAwesomeIcon icon={faHandPointLeft} /> Back
    </button>
  )
}

export const BtnLink = ({ linkPath, linkState, icon }) => {
  return (
    <Link to={{
      pathname: linkPath,
      state: linkState
    }}>
      <button className="btn-confirm margin-top">
        <FontAwesomeIcon icon={icon} /> Select Timer
    </button>
    </Link>
  )
}