import React from 'react';
import MessageBar from '../containers/message_bar.jsx';

const Lobby = (props) => {
  return (
    <div className="lobby-container">
      <h2>Lobby</h2>
      <div className="row">
        <MessageBar current_user_id={props.current_user_id} />
      </div>
    </div>
  );
}

export default Lobby;
