import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit {
  @ViewChild('frm') httpForm: NgForm;

  loadedPosts = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPostsList();
  }

  onCreatePost() {
    console.log(this.httpForm);
    this.http.post(
      'https://angular-backend-2268c-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      this.httpForm.value
    ).subscribe((respData) => {
      console.log('response', respData);
    });
  }

  resetForm() {
    this.httpForm.reset({
      title: '',
      content: ''
    });
  }

  onFetchPosts() {
    this.getPostsList();
  }

  getPostsList() {
    this.http.get('https://angular-backend-2268c-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json').subscribe((posts) => {
      console.log('posts list', posts);
    });
  }
}
