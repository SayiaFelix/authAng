import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  
  form:FormGroup | undefined

  constructor(private fb:FormBuilder,private AuthServiceService:AuthServiceService,private router:Router) { 
  }
// login(){

//   const val = this.form.value;
//   if (val.email && val.password){
//     this.AuthServiceService.login(val.email, val.password)
//     .subscribe(
//       ()=>{
//         console.log('user is logged in successful');
//         this.router.navigateByUrl('/')
//       }

//     )
//   }
// }




  ngOnInit(): void {
    this.form= this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

}
