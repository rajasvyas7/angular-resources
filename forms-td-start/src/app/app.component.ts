import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("f") vcForm: NgForm;

  //for using default value at the dropdown
  defaultQuestion = "teacher";

  //to show 2 way binding
  answer = "Not answered yet."

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  /**
   * one way is to pass the form object as paramter to the submit function
   */
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  /**
   * another way is to use @viewchild
   */
  onSubmit() {
    console.log(this.vcForm);
  }
}
