import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface Appointment{
  id: number;
  name: string;
  age: number;
  url: string;
}



@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})

export class AppointmentsComponent implements AfterViewInit {

  appointments: Appointment[]=[{
    id: 101,name: 'Faisal Saleh', age: 45 ,url: '../prescription' },
  {id: 102, name: 'Ceilla Yurid',age: 55 ,url: '../prescription'},
  {id: 103, name: 'Murad Saeed', age:38 ,url: '../prescription'},{
    id: 101,name: 'Faisal Saleh', age: 45 ,url: '../prescription' },
  {id: 102, name: 'Ceilla Yurid',age: 55,url: '../prescription' },
  {id: 103, name: 'Murad Saeed', age:38,url: '../prescription' },{
    id: 101,name: 'Faisal Saleh', age: 45 ,url: '../prescription' },
  {id: 102, name: 'Ceilla Yurid',age: 55,url: '../prescription' },
  {id: 103, name: 'Murad Saeed', age:38,url: '../prescription' },{
    id: 101,name: 'Faisal Saleh', age: 45,url: '../prescription'  },
  {id: 102, name: 'Ceilla Yurid',age: 55 ,url: '../prescription'},
  {id: 103, name: 'Murad Saeed', age:38 ,url: '../prescription'},
  
] 
  displayedColumns: string[] = ['id', 'name', 'age', 'link'];
  dataSource: MatTableDataSource<Appointment>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
     // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.appointments); }


    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
  
  
  