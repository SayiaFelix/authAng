import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

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

  constructor(public dialog: MatDialog ,private api : ApiService,private toast:NgToastService,  private confirmService:NgConfirmService) {}

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
        this.toast.error({detail:'ERROR!!!',summary:"Error while recording/fetching the data!!",duration:5000})
        // alert('error while recording/fetching the data')
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
      this.confirmService.showConfirm("Are you sure you want to delete this??",
      ()=>{
        this.toast.info({detail:'DELETED!!!',summary:"Product Deleted Successfully!!",duration:5000})
        //  alert("Product Deleted Successfully");
        },
      ()=>{
        this.toast.info({detail:'DELETED!!!',summary:"You cancelled your deletion!!",duration:5000})
        // alert("Product not Deleted");
      })
      
       this.getAllProduct();

    },
    error:()=>{
      this.toast.error({detail:'CANCELLED!!!',summary:"Error while Deleting the product!!",duration:5000})
      // alert('Error while Deleting the product');
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
