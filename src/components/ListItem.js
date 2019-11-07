import React from 'react';

import firebase from '../services/firebase';

const ListItem = (props) => {
  const messageData = props.data;
  const key = props.firebaseKey;

  const toggleIsChecked = () => {
    messageData.isChecked = !messageData.isChecked;
    firebase.updateTo(`messages/${key}`, messageData);
  }

  const removeItem = () => {
    firebase.remove(`messages/${key}`);
  }

  const isChecked = messageData.isChecked;

  return (
    <div
      className={`${isChecked ? 'list-group-item-secondary' : ''} list-group-item list-group-item d-flex justify-content-between align-items-center`}
    >
      <div onClick={toggleIsChecked} className="w-100">
        {messageData.message}
        <br />
        <small className="text-muted">{messageData.time || 'No time'}</small>
      </div>
      <span className="badge badge-danger badge-pill" onClick={removeItem}>x</span>
    </div>
  );
}

export default ListItem;
