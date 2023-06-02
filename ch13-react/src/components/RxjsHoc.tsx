import { useEffect, useRef, useState } from "react";
import { Observable } from "rxjs";

export function observe<P extends object, T>(
  WrappedComponent: React.FC<P>,
  observableFactory: (props: Partial<P>, state: T) => Observable<P>,
  defaultState: T
) {
  return (props: Partial<P>) => {
    const props$ = useRef(observableFactory(props, defaultState));
    const [state, setState] = useState<P>();

    // console.log("render", state);

    useEffect(() => {
      const subscription = props$.current.subscribe((state) => {
        setState(state);
      });
      return () => {
        subscription.unsubscribe();
      };
    }, []);
    if(!state) return null;
    return <WrappedComponent {...props} {...state}></WrappedComponent>;
  };
}
