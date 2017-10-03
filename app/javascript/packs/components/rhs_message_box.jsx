import React from 'react';

const RightMessageBox = ({ message }) => {
  return (
    <div className="clearfix">
      <div className="rhs-message-bubble">
        {message.body}
      </div>
    </div>
  )
}

export default RightMessageBox;
