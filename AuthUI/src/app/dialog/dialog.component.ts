import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

freshnessList=['Brand New','Second Hand','Refurbished']

productForm!: FormGroup
  constructor(private formbuilder: FormBuilder,private api : ApiService) { }

  ngOnInit(): void {
  this.productForm= this.formbuilder.group({
    name: ['',Validators.required],
    category: ['',Validators.required],
    fresh: ['',Validators.required],
    price: ['',Validators.required],
    comment: ['',Validators.required],
    date: ['',Validators.required]
  })


}


addProduct(){
if(this.productForm.valid){
  this.api.postProduct(this.productForm.value)
  .subscribe({
    next:(res)=>{
      alert("product added successfully!");
    },error:()=>{
      alert("Error while adding the product")
    }
  })

}
}
}
