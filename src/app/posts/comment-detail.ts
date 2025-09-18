import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, Posts, Comment } from '../user.service';

@Component({
  selector: 'app-comment-detail',
  template: `
    @if (data()) {
      <section>
        <h2>Post title: {{ data()!.post.title }}</h2>
        <ul>
          @for (comment of data()!.comments; track comment.id) {
            <li>
              <span class="comment-name">Comment name: {{ comment.name }}</span>
              <p>Comment content: {{ comment['body'] }}</p>
            </li>
          }
        </ul>
      </section>
    } @else {
      <p>Loading...</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);

  readonly data = signal<{ post: Posts; comments: Comment[] } | undefined>(undefined);

  constructor() {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    if (postId) {
      this.userService.getPostWithComments(postId).subscribe({
        next: result => this.data.set(result),
        error: () => this.data.set(undefined)
      });
    }
  }
}
