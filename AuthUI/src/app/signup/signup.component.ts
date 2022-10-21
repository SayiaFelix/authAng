import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  public SignupForm!: FormGroup; 
  constructor(private fb:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private toast:NgToastService
    ) { }

  ngOnInit(): void {
    this.SignupForm= this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
  })

}
Signup(){
  if(this.SignupForm.valid){
    console.log(this.SignupForm.value);
    this.http.post<any>("http://localhost:3000/signupusers/",this.SignupForm.value)
    .subscribe(res=>{
      this.toast.success({detail:'Success Message',summary:"Sign In Successfully!!",duration:5000})
      // alert('Signup successfully');
      this.SignupForm.reset();
     this.router.navigate(['login']);
    },err=>{
      this.toast.error({detail:'Failed Message',summary:"Sign In Failed, Something Went wrong!!",duration:5000})
      // alert('something went wrong')

    })
    // send obj to db

  }else{
    // console.log('Form is not valid')
    // through an error

    this.validateAllFormFields(this.SignupForm)
    alert('Form is  invalid')
  }

}

private validateAllFormFields(formGroup:FormGroup)
{
Object.keys(formGroup.controls).forEach(field=>{
  const control = formGroup.get(field);

  if( control instanceof FormControl){
    control.markAsDirty( {onlySelf: true});
  }
  else if( control instanceof FormGroup){
    this.validateAllFormFields(control);
  }
})
  
}

}