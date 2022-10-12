import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  constructor(public dialog: MatDialog ,private api : ApiService) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
   
    });
  }

  getAllProduct(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        console.log(res);

      },
      error:(err)=>{
        alert('error while recording/fetching the data')
      }
    })

  }

  ngOnInit(): void {
    this.getAllProduct();
  }

}
