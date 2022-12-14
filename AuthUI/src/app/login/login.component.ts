import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import { GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
// import { FacebookLoginProvider } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  
  public LoginForm!: FormGroup; 
  user!:SocialUser
  private accessToken = '';
  loggedIn!: boolean;


  constructor(private fb:FormBuilder, 
    private http:HttpClient,
     private router:Router,
     private authService: SocialAuthService,
     private toast: NgToastService
     ) {}

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
        // alert('Login Successfully');
        this.toast.success({detail:'SUCCESS!!!!',summary:"Login Successfully!!",duration:5000})
        // this.toast.info({detail:'Welcome Message',summary:"Welcome to our Dashboard!!",duration:5000})
        this.LoginForm.reset();
        this.router.navigate(['dashboard']);
      }
      else{
        this.toast.error({detail:'FAILED!!!',summary:"Login Failed!!",duration:5000})
        // this.toast.warning({detail:'Warming Message',summary:"User Not Found,Use Correct Details!!",duration:5000})
        // alert('User not found')
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
// sign in with google
    // this.authService.authState.subscribe(
    //   (user)=>{
    //     this.user=user;
    //   }
    // )
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });

  }
// signWithGoogle():any{
//   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
// }

// signOut():any{
//   this.authService.signOut();
// }
// loginWithGoogle(): void {
//   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
//     .then(() => this.router.navigate(['dashboard']));
// }

}
