import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, map, timer } from 'rxjs';
import { RxHook } from 'src/app/hooks/rx.hook';

@Component({
  selector: 'app-rx-hook',
  templateUrl: './rx-hook.component.html',
  providers: [RxHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxHookComponent {
  counter$ = this.rx.use(timer(5000, 1000).pipe(map(i => i.toString().padStart(5, "0"))));

  constructor(private rx: RxHook) {}
}
