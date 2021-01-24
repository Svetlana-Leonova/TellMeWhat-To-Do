const input = document.getElementById("userInput");
const ul = document.querySelector("ul");

export default class ListItem {
  constructor(toDoItem, done = false) {
    (this.toDoItem = toDoItem), (this.done = done);
    // this.addEventListener("click", this.markComplete());
  }
  addListItem() {
    let li = document.createElement("li"); // creates an element "li"
    li.appendChild(document.createTextNode(this.toDoItem)); //makes text from input field the li text
    ul.appendChild(li); //adds li to ul
    input.value = ""; //Reset text input field
    let dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("X"));
    li.appendChild(dBtn);
    dBtn.addEventListener("click", this.deleteListItem());
  }
  markComplete() {
    // this.classList.toggle("done");
    this.done = !this.done;
  }
  deleteListItem() {
    // this.classList.add("delete");
  }
}
