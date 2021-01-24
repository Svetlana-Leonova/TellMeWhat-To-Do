window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();
// import ListItem from "./components/ListItem";
const enterButton = document.getElementById("enter");
const input = document.getElementById("userInput");

export const dictate = () => {
  recognition.start();
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    let voiceCommand = speechToText.split(" ")[0];
    let toDoText = speechToText.split(" ").slice(1).join(" ");
    // let newItem = new ListItem(toDoText);
    if (event.results[0].isFinal) {
      console.log("ToDoText>>>>>", toDoText);
      console.log("voiceCommand>>>>>", voiceCommand);
      //   if (voiceCommand.includes("add")) {
      //     console.log(newItem);
      //     newItem.addListItem();
      //   }
      //   if (voiceCommand.includes("delete" || "remove")) {
      //     console.log(toDoItem);
      //     newItem.deleteListItem();
      //   }
      // }
    }
  };
};

// function inputLength() {
//   return input.value.length;
// }

// function addListAfterClick() {
//   if (inputLength() > 0) {
//     let newItem = new ListItem(input.value);
//     newItem.addListItem();
//   }
// }

// function addListAfterKeypress(event) {
//   if (inputLength() > 0 && event.which === 13) {
//     let newItem = new ListItem(input.value);
//     newItem.addListItem();
//   }
// }

// enterButton.addEventListener("click", addListAfterClick);

// input.addEventListener("keypress", addListAfterKeypress);
