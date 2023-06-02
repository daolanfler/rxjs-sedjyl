import { Observable, debounceTime, filter, fromEvent, map } from "rxjs";
import { createApp, ref } from "vue/dist/vue.esm-browser.js";

const body = document.querySelector("body") as HTMLBodyElement;
const firstChild = body.firstChild;

const container = document.createElement("div");
body.insertBefore(container, firstChild);
container.style.height = "300px";
container.style.width = "100%";

createApp({
  setup() {
    const count = ref("hello world");
    return {
      count,
    };
  },
  template: `
  <div>
    <label for="search-input" style="margin-right: 8px">搜索GitHub代码库:</label>
    <input id="search-input" type="text" placeholder="search" />
    <ul id="results">
    </ul>
  </div>
  `,
}).mount(container);

const createKeyup$ = () => {
  return fromEvent(document.querySelector("#search-input")!, "keyup");
};

const searchRepo$ = (key$: Observable<KeyboardEvent>) => {
  return key$.pipe(
    debounceTime(150),
    map((event) => (event.target as HTMLInputElement).value),
    map((text) => text.trim()),
    filter((query) => query.length !== 0)
  );
};
