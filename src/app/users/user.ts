import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  template: `
    <ul>
      @for (user of users() | async; track user.id) {
        <li>
          <button type="button" (click)="goToUser(user.id)" class="username" style="background:none;border:none;padding:0;cursor:pointer;">
            {{ user.username }}
          </button>
        </li>
      }
    </ul>
  `,
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  readonly users = computed(() => this.userService.getUsers());

  constructor(private readonly userService: UserService, private readonly router: Router) {}

  goToUser(id: number): void {
    this.router.navigate(['/users', id]);
  }
}
