import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, Posts, Comment } from '../user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-comment-detail',
  template: `
    <section *ngIf="data() | async as result; else loading">
      <h2>{{ result.post.title }}</h2>
      <ul>
        <li *ngFor="let comment of result.comments; trackBy: trackById">
          <span class="comment-name">{{ comment.name }}</span>
          <p>{{ comment.body }}</p>
        </li>
      </ul>
    </section>
    <ng-template #loading>
      <p>Loading...</p>
    </ng-template>
  `,
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);

  readonly data = signal(
    this.userService.getPostWithComments(Number(this.route.snapshot.paramMap.get('id')))
  );

  trackById(_: number, comment: Comment): number {
    return comment.id;
  }
}
