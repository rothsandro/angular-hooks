import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../types/user.types';

@Component({
  selector: 'app-user',
  template: `<p *ngIf="user">User: {{ user.name }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  @Input()
  user?: User;
}
