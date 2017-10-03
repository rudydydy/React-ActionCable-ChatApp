import React from 'react';

const LeftMessageBox = ({ message }) => {
  return (
    <div className="clearfix">
      <div className="lhs-message-bubble">
        <b>{message.user.username}</b><br />
        {message.body}
      </div>
    </div>
  )
}

export default LeftMessageBox;
