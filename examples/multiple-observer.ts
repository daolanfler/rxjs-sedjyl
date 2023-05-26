import { Observable } from 'rxjs';

function onSubscribe(observer) {
  let count = 1;
  const timer = setInterval(() => {
    console.log('in onSubscribe');
    observer.next(count++);
  }, 3000);
  // 有2个观察者的时候，有2个 timer ,所以 source$ 是一个 Cold Observer
  console.log('timer', timer);

  return () => {
    // clearInterval(timer)
  };
}

const soruce$ = new Observable(onSubscribe);

const subscription = soruce$.subscribe((c) => {
  console.log(c);
  if (c >= 3) {
    subscription.unsubscribe();
  }
});

soruce$.subscribe((c) => {
  console.log('observer2: ', c);
});
