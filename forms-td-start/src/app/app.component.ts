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
  defaultAnswer = "Not answered yet."

  genders = ["Male", "Female", "Others"];
  selectedGender = "Male";

  submittedForm = [];

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
    // console.log(typeof this.vcForm.value, Object.keys(this.vcForm.value), this.vcForm);
    this.submittedForm = this.obj2ArrConvertor(this.vcForm.value);
    this.vcForm.reset({
      secret_question: this.defaultQuestion,
      answer: 'Not answered yet.',
      gender: this.selectedGender
    });
  }

  obj2ArrConvertor(obj: Object) {
    let retArr = [];
    for (let [key, value] of Object.entries(obj)) {
      // console.log(`{${key}: ${value}}`);
      if (typeof value === 'object') {
        // console.log('calling self', value);
        let arr = this.obj2ArrConvertor(value);
        retArr.push(...arr);
      }
      else {
        // console.log('key:', key, 'val:', value);
        retArr.push({'key': key, 'value': value});
      }
    }
    // console.log('obj2arr', obj, retArr);
      return retArr;
  }
}
