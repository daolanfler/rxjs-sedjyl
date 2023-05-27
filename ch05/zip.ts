import { of, zip, interval } from 'rxjs';

const source$1 = of(1, 2, 3, '4');
const source$2 = of('a', 'b', 'c');
const source$3 = interval(1000);

// 木桶效应，最短的 complete 了，zip 也 complete 了
// zip 存在背压问题
zip(source$1, source$2, source$3).subscribe(console.log, null, () =>
  console.log('complete')
);
