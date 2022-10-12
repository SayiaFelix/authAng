import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'fresh', 'price','comment','date','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog ,private api : ApiService) {}

  openDialog() {
    this.dialog.open(DialogComponent,{
      width:'40%'
    }).afterClosed().subscribe(val => {
    if(val==='save'){
        this.getAllProduct();
      }
    })
  }


  getAllProduct(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;

      },
      error:(err)=>{
        alert('error while recording/fetching the data')
      }
    })

  }

  editProduct(row : any){
   this.dialog.open(DialogComponent,{
     width:'40%',
     data:row
}).afterClosed().subscribe(val => {
  if(val==='update'){
      this.getAllProduct();
    }
  })
}

deleteProduct(id : number){
  this.api.deleteProduct(id)
  .subscribe({
    next:(res)=>{
      alert("Product Deleted Successfully");
       this.getAllProduct();

    },
    error:()=>{
      alert('Error while Deleting the product');
    }
  })

}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  ngOnInit(): void {
    this.getAllProduct();
  }
  
}
