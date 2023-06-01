const body = document.querySelector("body") as HTMLBodyElement;
const firstChild = body.firstChild;

const div = document.createElement("div");
div.id = "myDiv";
const button = div.appendChild(document.createElement("button"));
button.id = "myButton";
button.textContent = "Click me!";

body.insertBefore(div, firstChild);

let myDiv = document.getElementById("myDiv") as HTMLDivElement;
let myButton = document.getElementById("myButton") as HTMLButtonElement;

/** useCapture 默认为 false, 可以看到 log 的先后顺序不同 */
myDiv.addEventListener(
  "click",
  function () {
    console.log("Div was clicked!");
  },
  true
);

myButton.addEventListener("click", function (event) {
  console.log("Button was clicked!");
});
