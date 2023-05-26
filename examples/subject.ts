import { BehaviorSubject, Subject } from "rxjs";

const subject1 = new BehaviorSubject(100);

subject1.next(1);
subject1.next(2);
subject1.next(3);
// BehaviorSubject 在接收到订阅时会吐出上一个数据，所以需要传入一个 default 值
setTimeout(() => {
  subject1.subscribe((n) => {
    console.log(n);
  });
}, 1000)


const subject2 =  new Subject();

const subscription2_1 = subject2.subscribe((str) => {
    console.log("observer1", str)
})

subject2.next('subject2 next 1')

// subscription2_1.unsubscribe()
// Subject 则不同，从最新的值开始取
subject2.subscribe((str) => {
  console.log('observer2', str)
})
subject2.next('subject2 next 2')