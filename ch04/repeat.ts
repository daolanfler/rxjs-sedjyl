import { Observable, repeat } from 'rxjs';

const source$ = new Observable((observer) => {
  console.log('on subscribe');
  setTimeout(() => observer.next(1), 1000);
  setTimeout(() => observer.next(2), 2000);
  setTimeout(() => observer.next(3), 3000);
  setTimeout(() => observer.complete(), 4000);

  return () => {
    console.log('unsubscribe');
  };
});

source$.pipe(repeat(2)).subscribe(console.log, null, () => {
  console.log('completed')
});

