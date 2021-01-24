import React from "react";
import micIcon from "../../dist/mic-icon.png";
import chime from "../../dist/chime.mp3";
import { dictate } from "../speechRecog";

export class Microphone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    this.handleClick.bind(this);
  }

  handleClick() {
    let audio = new Audio(chime);
    audio.play();
    dictate();
  }
  render() {
    return (
      <div>
        <button className="button" onClick={this.handleClick}>
          <img className="mic-icon" src={micIcon} />
        </button>
      </div>
    );
  }
}
