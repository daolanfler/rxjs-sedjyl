import { padStart } from "lodash-es";
import { observe } from "./RxjsHoc";
import {
  BehaviorSubject,
  EMPTY,
  Subject,
  interval,
  map,
  mergeWith,
  of,
  scan,
  switchMap,
  timeInterval,
} from "rxjs";

interface StopWatchViewProps {
  milliseconds: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const ms2Time = (milliseconds: number) => {
  const ms = milliseconds % 1000;
  const seconds = Math.floor(milliseconds / 1000);
  const s = seconds % 60;
  const minutes = Math.floor(seconds / 60);
  const m = minutes % 60;
  const h = Math.floor(minutes / 60);

  return `${padStart(h.toString(), 2, "0")}:${padStart(
    m.toString(),
    2,
    "0"
  )}:${padStart(s.toString(), 2, "0")}.${padStart(ms.toString(), 3, "0")}`;
};

const StopWatchView = ({
  milliseconds,
  onReset,
  onStart,
  onPause,
}: StopWatchViewProps) => {
  return (
    <div>
      <h1>{ms2Time(milliseconds)}</h1>
      <button onClick={onStart}>Start</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

const ACTIONS = {
  START: "START",
  PAUSE: "PAUSE",
  RESET: "RESET",
} as const;
type A = keyof typeof ACTIONS;

export const StopWatch = observe(
  StopWatchView,
  (props, initialState) => {
    const button = new Subject<A>();
    let duration = initialState
    
    const timer$ = button.pipe(
      switchMap((value: keyof typeof ACTIONS) => {
        switch (value) {
          case ACTIONS.START:
            return interval(10).pipe(
              timeInterval(),
              scan((acc, curr) => {
                duration = acc + curr.interval
                return duration
              }, duration)
            );
          case ACTIONS.PAUSE:
            return EMPTY;
          case ACTIONS.RESET:
            duration = 0;
            return of(0);
        }
      })
    );

    const stopWatch = new BehaviorSubject(duration);
    return stopWatch.pipe(
      mergeWith(timer$),

      map((value) => ({
        milliseconds: value,
        onPause: () => button.next(ACTIONS.PAUSE),
        onStart: () => button.next(ACTIONS.START),
        onReset: () => button.next(ACTIONS.RESET),
      }))
    );
  },
  1000000
);
