import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit {
  @ViewChild('frm') httpForm: NgForm;
  
  loadedPosts:Post[] = [];
  isLoading = false;
  error = null;

  constructor(private http: HttpClient, private postService: PostService) { }

  ngOnInit(): void {
    this.getPostsList();
  }

  onCreatePost() {
    console.log(this.httpForm);
    this.postService.createPost(this.httpForm.value)
    .then(
      (id: string) => {
        console.log('Postg created with id: ', id);
        this.resetForm();
        this.getPostsList();
      }
    );
  }

  resetForm() {
    this.httpForm.reset({
      title: '',
      content: ''
    });
  }

  getPostsList() {
    this.isLoading = true;
    this.postService.listPosts()
    .subscribe(
      (posts: Post[]) => {
        this.loadedPosts = posts;
        this.isLoading = false;
      },
      (error) => {
        console.log('fetch error', error);
        this.error = error;
      }
    );
  }

  onClearPosts() {
    if (confirm("All posts will be deleted, do you want to continue?")) {
      this.postService.deleteAllPosts()
      .subscribe((data:any) => {
        console.log('deleted', data);
        this.loadedPosts = [];
      })
    }
  }
}

