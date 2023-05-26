import { of, zip, interval } from 'rxjs';

const source$1 = of(1, 2, 3, '4');
const source$2 = of('a', 'b', 'c', 'd');
const source$3 = interval(1000);

// zip 存在背压问题
zip(source$1, source$2, source$3).subscribe(console.log, null, () =>
  console.log('complete')
);
