import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

freshnessList=['Brand New','Second Hand','Refurbished']

productForm!: FormGroup
  constructor(private formbuilder: FormBuilder) { }

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
}
