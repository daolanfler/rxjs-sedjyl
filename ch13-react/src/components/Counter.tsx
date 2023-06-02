import { useState } from "react";
import { BehaviorSubject, Subject, map, scan } from "rxjs";
import { observe } from "./RxjsHoc";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const counter = new Subject<number>();
  const observer = (val: number) => setCount(val);
  counter.pipe(scan((acc, curr) => acc + curr, count)).subscribe(observer);

  const increase = () => {
    // setCount((c) => c + 1);
    counter.next(1);
  };

  const decrease = () => {
    // setCount((c) => c + 1);
    counter.next(-1);
  };

  return <CounterView count={count} increase={increase} decrease={decrease} />;
};

interface CounterViewProps {
  count: number;
  increase: () => void;
  decrease: () => void;
}

const CounterView = ({ count, increase, decrease }: CounterViewProps) => {
  return (
    <div>
      <h1>Count: {count}</h1>
      <div className="mt-4">
        <button onClick={() => decrease()}>-</button>
        <button
          className="ml-6"
          onClick={() => {
            increase();
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export const Counter2 = observe(
  CounterView,
  (props, state) => {
    const counter = new BehaviorSubject<number>(0);
    return counter.pipe(
      scan((acc, curr) => acc + curr, state),
      map((c) => {
        return {
          ...props,
          count: c,
          decrease: () => counter.next(-1),
          increase: () => counter.next(1),
        };
      })
    );
  },
  122
);
