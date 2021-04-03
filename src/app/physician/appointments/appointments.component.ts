import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';

import { Appointment } from 'src/app/shared/classes';
import { AppointmentsService } from './appointments.service';

@Component({
  selector: 'app-appointments',
  providers: [AppointmentsService],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})

export class AppointmentsComponent implements AfterViewInit {

  appointments: Appointment[];

  //Appointments Table Description
  displayedColumns: string[] = ['id', 'name', 'age', 'link'];
  dataSource: MatTableDataSource<Appointment>;

  //sort & paginator for table appointment
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private appointmentService: AppointmentsService) {
     // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.appointments); 
  }

  //By-default method for Tables sort and paging
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
  
  
  