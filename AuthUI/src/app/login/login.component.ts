import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  
  public LoginForm!: FormGroup; 

  constructor(private fb:FormBuilder, private http:HttpClient, private router:Router) { }

login(){
  if(this.LoginForm.valid){
    // send obj to db
    console.log(this.LoginForm.value);
    this.http.get<any>("http://localhost:3000/signupusers/")
    .subscribe(res=>{
      const user = res.find((a:any)=>{

      return a.email === this.LoginForm.value.email &&
       a.password === this.LoginForm.value.password
      });
      if(user){
        alert('Login Successfully');
        this.LoginForm.reset();
        this.router.navigate(['dashboard']);
      }
      else{
        alert('User not found')
      } 
    },
    err=>{
      alert('Something went Wrong ,Try again!!!!!')
    })
    
  }
  else{
    // console.log('Form is not valid')
    // through an error
    this.validateAllFormFields(this.LoginForm)
    alert('Form is invalid')
  }
  // if (val.email && val.password){
  //   this.AuthServiceService.login(val.email, val.password)
  //   .subscribe(
  //     ()=>{
  //       console.log('user is logged in successful');
  //       this.router.navigateByUrl('/')
  //     }

  //   )
  // }
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

  ngOnInit(): void {
    this.LoginForm= this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

}
