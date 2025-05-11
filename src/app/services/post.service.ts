import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Post, PostRequest } from "../data/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = `${environment.apiUrl}/v1/posts`;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.postsUrl}/${id}`);
  }

  create(post: PostRequest): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post);
  }

  update(id: string, post: PostRequest): Observable<Post> {
    return this.http.put<Post>(`${this.postsUrl}/${id}`, post);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.postsUrl}/${id}`);
  }

  // ✅ Session 6: teacher wants search by value
  search(value: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postsUrl}?value=${value}`);
  }
}
