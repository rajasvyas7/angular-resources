import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  usersDB = [];
  existingUsernames = [];
  userErrorMsgs = {
    required: 'Please enter a username.',
    already_exist: 'The username already exists.'
  }

  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.checkUsername.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
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

  onAddHobby() {
    const elmHobby = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(elmHobby);
  }

  getHobbiesControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  //Custom validator
  checkUsername(control: FormControl): {[key: string]: boolean} {
    if (this.existingUsernames && this.existingUsernames.indexOf(control.value) >= 0) {
      return {already_exist: true};
    }
    return null;
  }
}
