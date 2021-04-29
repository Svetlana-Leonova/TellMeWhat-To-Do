import React from "react";

const Instructions = () => {
  return (
    <div>
      <h1>TO-DO LIST</h1>
      <h2>Welcome to your voice-controlled to-do list app!</h2>
      <table>
        <body>
          <tr>
            <td>
              <p>Click the microphone icon below and start speaking:</p>
              <p className="first">
                Say: "ADD [YOUR-TO-DO]" to add items to your list.
              </p>
              <p className="second">
                Say: "COMPLETE [YOUR-TO-DO]" to toggle completion status.
              </p>
              <p className="third">
                Say: "REMOVE [YOUR-TO-DO]" to remove the item from your list.
              </p>
            </td>
            <td>
              <p>Tired of voice commands? Use regular text input:</p>
              <p className="first">
                Enter text into the input field to add items to your list.
              </p>
              <p className="second">Click the item to mark it as complete.</p>
              <p className="third">
                Click the "X" to remove the item from your list.
              </p>
            </td>
          </tr>
        </body>
      </table>
    </div>
  );
};

export default Instructions;
