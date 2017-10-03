import React from 'react';

const MessageTimeline = ({ message }) => {
  return <div className="message-timeline">{message.created_at}</div>;
}

export default MessageTimeline;
