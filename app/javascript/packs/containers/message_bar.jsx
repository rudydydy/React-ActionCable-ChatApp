import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionCable from 'actioncable';
import {
  fetchInitialMessages,
  incomingMessage,
  loadMoreMessages
} from '../actions/message';
import MessageTimeline from '../components/message_timeline';
import RightMessageBox from '../components/rhs_message_box';
import LeftMessageBox from '../components/lhs_message_box';
import MessageForm from './message_form';

class MessageBar extends Component {
  componentDidMount() {
    this.setupActionCable();
    this.props.fetchInitialMessages()
      .then(() => this.scrollToBottom());
  }

  scrollToBottom() {
    this.refs.messageBar.scrollTop = this.refs.messageBar.scrollHeight;
  }

  setupActionCable() {
    const cable = ActionCable.createConsumer();

    let lobbyChannel = cable.subscriptions.create("LobbyChannel", {
      connected: () => {},
      disconnected: () => {},
      received: (data) => {
        const message = JSON.parse(data.message);
        this.props.incomingMessage(message);
        this.scrollToBottom();
      }
    });
  }

  handleScroll() {
    const { loading, finishFetching } = this.props;

    if (this.refs.messageBar.scrollTop <= 50 && !loading && !finishFetching) {
      const previousHeight = this.refs.messageBar.scrollHeight;
      this.props.loadMoreMessages()
        .then(() => {
          const currentHeight = this.refs.messageBar.scrollHeight;
          const heightDifference = currentHeight - previousHeight;
          this.refs.messageBar.scrollTop = heightDifference;
        })
    }
  }

  renderLoading() {
    if (this.props.loading) {
      return <div className="text-center text-success">Loading...</div>;
    }
    return null
  }

  renderMessagesList() {
    const { messages, current_user_id } = this.props;
    const messageDates = [...new Set(messages.map((message) => message.created_at))];
    let messageList = [];
    let messageDatesIndex = -1;

    for (let message of messages) {
      if (messageDatesIndex === -1 || messageDates[messageDatesIndex] !== message.created_at) {
        messageList.push(
          <MessageTimeline
            key={message.created_at}
            message={message}
          />
        )
        messageDatesIndex += 1;
      }

      if (current_user_id === message.user.id) {
        messageList.push(
          <RightMessageBox
            key={message.id}
            message={message}
          />
        )
      } else {
        messageList.push(
          <LeftMessageBox
            key={message.id}
            message={message}
          />
        )
      }
    }

    return messageList;
  }

  render() {
    const loadingState = this.renderLoading();
    const messageList = this.renderMessagesList();

    return (
      <div className="col-lg-12 lobby-chatbar">
        <div
          onScroll={() => this.handleScroll()}
          ref="messageBar"
          className="message-area"
        >
          {loadingState}
          {messageList}
        </div>
        <MessageForm />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.message.loading,
    messages: state.message.messages,
    finishFetching: state.message.finishFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchInitialMessages: () =>
      dispatch(fetchInitialMessages()),
    incomingMessage: (message) =>
      dispatch(incomingMessage(message)),
    loadMoreMessages: () =>
      dispatch(loadMoreMessages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar)
