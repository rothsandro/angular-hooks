import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StateHook } from 'src/app/hooks/state.hook';
import { randomName } from '../rx-hook/name-list';

@Component({
  selector: 'app-state-hook',
  templateUrl: './state-hook.component.html',
  providers: [StateHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateHookComponent implements OnInit {
  state = this.stateHook.use({
    counter: 0,
    user: { id: 1, name: 'John Doe' },
  });

  constructor(private stateHook: StateHook) {}

  ngOnInit(): void {
    // Don't forget to clear the interval in production!
    window.setInterval(() => {
      // Update simple state
      this.state.$set({ counter: this.state.counter + 1 });

      // Update object
      this.state.$set((state) => {
        state.user.name = randomName();
      });
    }, 1000);
  }
}
