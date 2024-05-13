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

  genders = ["Male", "Female", "Others"];
  selectedGender = "Male"

  // to change the value of username field
  suggestUserName() {
    const suggestedName = 'sudouser';

    //option 1 setting up the whole form
    // this.vcForm.setValue({
    //   //whole value object of the form
    // })

    // option 2 settinvg vlaue for a specific field 
    this.vcForm.form.patchValue({
      userDataGrp: {
        username: suggestedName
      }
    });
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
