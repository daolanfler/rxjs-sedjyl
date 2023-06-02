import {
  Observable,
  debounceTime,
  filter,
  from,
  fromEvent,
  map,
  switchMap,
} from "rxjs";
import { createApp, ref } from "vue/dist/vue.esm-browser.js";
import { searchRepo2$ } from "./search";

const body = document.querySelector("body") as HTMLBodyElement;
const firstChild = body.firstChild;

const container = document.createElement("div");
body.insertBefore(container, firstChild);
container.style.height = "300px";
container.style.width = "100%";
container.style.overflowY = "scroll";

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

const searchRepo$ = (key$: Observable<Event>) => {
  return key$.pipe(
    debounceTime(400),
    map((event) => (event.target as HTMLInputElement).value),
    map((text) => text.trim()),
    filter((query) => query.length !== 0),
    switchMap((query) => {
      const url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`;
      return from(fetchApi(url));
    })
  );
};

const fetchApi = (url: string) => {
  return fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Invalid status for url: " + url);
      }
      return response.json();
    })
    .then((json) => {
      return {
        total_count: json.total_count,
        items: json.items.map((x: any) => ({
          name: x.name,
          full_name: x.full_name,
        })),
      };
    });
};

searchRepo2$(
  createKeyup$(),
  (query) =>
    from(
      fetchApi(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`
      )
    ),
  400
).subscribe((result) => {
  const ul = document.querySelector("#results") as HTMLUListElement;
  ul.innerHTML = result.items
    .map((repo: any) => {
      return `<li>${repo.full_name}</li>`;
    })
    .join("");
});
