import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user-detail',
  template: `
    @if (user()) {
      <div>
        <h2>{{ user()?.username }}</h2>
        <p>City: {{ user()?.address?.city }}</p>
      </div>
    } @else {
      <p>User not found.</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);

  readonly user = signal<User | undefined>(undefined);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.userService.getUserById(id).subscribe({
        next: user => this.user.set(user),
        error: () => this.user.set(undefined)
      });
    }
  }
}
