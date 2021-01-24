import React from "react";

export class InputForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <input
            id="userInput"
            type="text"
            placeholder="New item..."
            maxLength="27"
          />
          <button id="enter">
            Add<i className="fas fa-pencil-alt"></i>
          </button>
        </div>
      </div>
    );
  }
}
