import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  address: { city: string };
  [key: string]: any;
}

export interface Posts {
  id: number;
  userId: number;
  title: string;
  [key: string]: unknown;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getLatestPosts(limit = 10): Observable<Array<{ username: string; title: string }>> {
    return forkJoin({
      posts: this.http.get<Posts[]>(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`),
      users: this.getUsers()
    }).pipe(
      map(({ posts, users }: { posts: Posts[]; users: User[] }) =>
        posts.map((post: Posts) => ({
          username: users.find((u: User) => u.id === post.userId)?.username ?? 'Unknown',
          title: post.title
        }))
      )
    );
  }

  getLatestComments(limit = 10): Observable<Array<{ postId: number; postTitle: string; commentId: number; commentName: string }>> {
    return forkJoin({
      comments: this.http.get<Comment[]>(`${this.apiUrl}/comments?_limit=${limit}`),
      posts: this.http.get<Posts[]>(`${this.apiUrl}/posts`)
    }).pipe(
      map(({ comments, posts }) =>
        comments.map(comment => ({
          postId: comment.postId,
          postTitle: posts.find(p => p.id === comment.postId)?.title ?? 'Unknown',
          commentId: comment.id,
          commentName: comment.name
        }))
      )
    );
  }

  getPostWithComments(postId: number): Observable<{ post: Posts; comments: Comment[] }> {
    return forkJoin({
      post: this.http.get<Posts>(`${this.apiUrl}/posts/${postId}`),
      comments: this.http.get<Comment[]>(`${this.apiUrl}/comments?postId=${postId}`)
    });
  }
}
