import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl,Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  SignupForm!: FormGroup; 

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.SignupForm= this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
  })

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