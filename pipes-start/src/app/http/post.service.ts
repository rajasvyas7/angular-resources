import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class PostService {
  private FIREBASE_URL = "https://angular-backend-2268c-default-rtdb.asia-southeast1.firebasedatabase.app/";

/**
 * 
 * For error handling. another option is to define a subject here
 * in the subscribe method, pass second function which will recive error
 * user subject.next(error) to pass the error
 * in the componet onInit method, subscribe to the sevice.subject
 * dont forget to unsubscribe onDestroy
 */

  constructor(private http: HttpClient) { };

  createPost(post: Post) {  //option 1: to use promise or a subject with httpClient
    return new Promise((resolve, reject) => {
      this.http.post(`${this.FIREBASE_URL}posts.json`, post)
        .subscribe((respData: { name: string }) => {
          resolve(respData.name);
        });
    });
  }

  listPosts() { // option 2: returning the httpCLient & subscribing at the component
    return this.http.get(`${this.FIREBASE_URL}posts.json`)
      .pipe(
        map((respData: { [key: string]: Post }) => {
          const postsArr: Post[] = [];
          for (const key in respData) {
            if (respData.hasOwnProperty(key)) {
              postsArr.push({ ...respData[key], id: key });
            }
          }
          return postsArr;
        })
      );
  }

  deleteAllPosts() {
    return this.http.delete(`${this.FIREBASE_URL}posts.json`);
  }

}