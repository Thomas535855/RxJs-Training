import {Component, ChangeDetectionStrategy, signal, inject} from '@angular/core';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-posts',
  template: `
    <section>
      <h2>Latest Posts</h2>
      <ul>
        @for (post of posts() | async; track post.title) {
          <li>
            <span class="username">Username: {{ post.username }}</span>:
            <span class="title">Title: {{ post.title }}</span>
          </li>
        }
      </ul>
    </section>
  `,
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {
  readonly posts = signal(inject(UserService).getLatestPosts(10));

  constructor(private readonly userService: UserService) {}
}
