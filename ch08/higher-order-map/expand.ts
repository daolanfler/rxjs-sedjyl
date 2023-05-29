import { expand, of } from "rxjs";

of(1)
  .pipe(expand((x) => of(x + 1)))
  .subscribe(console.log);
