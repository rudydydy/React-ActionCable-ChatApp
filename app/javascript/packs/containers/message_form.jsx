import React, { Component } from 'react';
import { createMessage } from '../actions/message';
import { connect } from 'react-redux';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  handleSubmitMessage(e) {
    e.preventDefault();

    if (this.state.mesasge !== '') {
      this.props.createMessage(this.state.message)
        .then(() => this.setState({ message: '' }));
    }
  }

  render() {
    return (
      <div className="chat-form">
        <form onSubmit={(e) => this.handleSubmitMessage(e)}>
          <div className="form-row">
            <div className="col-lg-10">
              <input
                type="text"
                className="form-control"
                placeholder="Message..."
                value={this.state.message}
                onChange={(e) => this.setState({message: e.target.value})}
              />
            </div>
            <div className="col-lg-2">
              <button
                disabled={this.state.message !== '' ? false : true}
                type="submit"
                className="btn btn-primary btn-block"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createMessage: (message) => dispatch(createMessage(message))
  }
}

export default connect(() => ({}), mapDispatchToProps)(MessageForm)
