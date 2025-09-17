import { Routes } from '@angular/router';
import { UsersComponent } from  './users/user';
import { UserDetailComponent } from './user-detail/user-detail';
import { PostsComponent } from './posts/posts';
import { CommentsComponent } from './posts/comments';
import { CommentDetailComponent } from './posts/comment-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'comments/:id', component: CommentDetailComponent}
];
