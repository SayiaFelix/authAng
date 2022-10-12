import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

freshnessList=['Brand New','Second Hand','Refurbished']
productForm!: FormGroup
actionBtn : string= "save"

  constructor(private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public  editData: any,
    private api : ApiService,private dialogRef :MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  this.productForm= this.formbuilder.group({
    name: ['',Validators.required],
    category: ['',Validators.required],
    fresh: ['',Validators.required],
    price: ['',Validators.required],
    comment: ['',Validators.required],
    date: ['',Validators.required]
  })

if(this.editData){
  this.actionBtn='Update'
  this.productForm.controls['name'].setValue(this.editData.name);
  this.productForm.controls['category'].setValue(this.editData.category);
  this.productForm.controls['date'].setValue(this.editData.date);
  this.productForm.controls['fresh'].setValue(this.editData.fresh);
  this.productForm.controls['comment'].setValue(this.editData.comment);
  this.productForm.controls['price'].setValue(this.editData.price);
}
}


addProduct(){
if(this.productForm.valid){
  this.api.postProduct(this.productForm.value)
  .subscribe({
    next:(res)=>{
      alert("product added successfully!");
      this.productForm.reset();
      this.dialogRef.close('save');

    },error:()=>{
      alert("Error while adding the product")
    }
  })

}
}
}
