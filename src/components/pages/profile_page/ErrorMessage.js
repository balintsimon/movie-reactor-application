import React from 'react';
import './ErrorMessage.css';
import '../../../App.css';

const ErrorMessage = (props) => {
  const message = props.message;
  const username = props.username;

  return (
      <div className="error-message">
        <div className="error-text-container">
          <span className="error-text no-select"><span className="user-name-error no-select">{username}</span>{message}</span>
        </div>
      </div>
  );
};

export default ErrorMessage;
