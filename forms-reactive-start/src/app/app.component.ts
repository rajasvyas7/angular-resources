import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  usersDB = [];
  existingUsernames = [];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.checkUsername.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.checkEmail),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    console.log('user errors', this.signupForm.get('userData.username').errors)
    this.usersDB.push(this.signupForm.value);
    this.existingUsernames.push(this.signupForm.value.userData.username);
    console.log('Existing Users', this.existingUsernames);
    this.signupForm.reset({
      gender: 'male',
      hobbies: []
    });
  }

  // to add a field dynamically
  onAddHobby() {
    const elmHobby = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(elmHobby);
  }

  //a helper function
  getHobbiesControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  //Custom validator
  checkUsername(control: FormControl): {[key: string]: boolean} {
    if (this.existingUsernames && this.existingUsernames.indexOf(control.value) >= 0) {//validating condition
      return {already_exist: true};
    }
    return null;
  }

  //custome async validator
  checkEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "rajas.vyas@gmail.com") {
          resolve({already_exist: true});
        }
        else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }

  //helper function to show the error mesgs
  getErrorMsg(err: string, entity: string) {
    let errorMsgs = {
      required: `Please enter an ${entity}.`,
      already_exist: `The ${entity} already exists.`
    };
    return errorMsgs[err];
  }
}
