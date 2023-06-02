import "./App.css";
import { Counter2 } from "./components/Counter";
import { StopWatch } from "./components/StopWatch";

function App() {
  return (
    <>
      <div className="card">
        <Counter2></Counter2>
      </div>
      <StopWatch milliseconds={0}/>
    </>
  );
}

export default App;
