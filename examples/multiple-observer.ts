import { Observable, Observer, take } from "rxjs";

function onSubscribe(observer: Observer<number>) {
  let value = 0;
  const timer = setInterval(() => {
    observer.next(value++);
  }, 1000);
  // 有2个观察者的时候，有2个 timer ,所以 source$ 是一个 Cold Observer
  console.log("timer", timer);

  return () => {
    observer.complete()
    clearInterval(timer);
  };
}

const soruce$ = new Observable(onSubscribe);

const subscription = soruce$.pipe(take(4)).subscribe({
  next: (c) => {
    console.log( "observer1: ", c);
    /** unsubscribe 不等同于 complete */
    // if (c >= 3) {

    //   subscription.unsubscribe();
    // }
  },
  complete: () => {
    console.log("complete observer1");
  },
});

soruce$.subscribe((c) => {
  console.log("observer2: ", c);
});
