import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  template: `
    <section>
      <h2>Latest Comments:</h2>
      <ul>
        @for (item of comments() | async; track item.commentId) {
          <li>
            <button type="button" (click)="openDetail(item.postId)" style="background:none;border:none;padding:0;cursor:pointer;">
              <span class="post-title">Post title: {{ item.postTitle }}</span> -
              <span class="comment-name">Comment name: {{ item.commentName }}</span>
            </button>
          </li>
        }
      </ul>
    </section>
  `,
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {
  readonly comments = signal(inject(UserService).getLatestComments(10));
  private readonly router = inject(Router);

  openDetail(postId: number): void {
    this.router.navigate(['/comments', postId]);
  }

}
