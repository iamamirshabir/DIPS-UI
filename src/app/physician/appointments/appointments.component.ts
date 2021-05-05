import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';

import { Appointment } from 'src/app/shared/classes';
import { PhysicianService } from '../physician.service';
import { AppointmentsService } from './appointments.service';

@Component({
  selector: 'app-appointments',
  providers: [AppointmentsService],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})

export class AppointmentsComponent implements AfterViewInit {

  appointments: Appointment[];

  selectedAppointment: Appointment;

  //Appointments Table Description
  displayedColumns: string[] = ['appointment_id', 'user.userac_name', 'user.userac_dob', 'user.userac_id'];
  dataSource: MatTableDataSource<Appointment>;
  appointmentsLoaded: Promise<boolean>;

  //sort & paginator for table appointment
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private appointmentService: AppointmentsService, 
    private physicianService: PhysicianService) {
     // Assign the data to the data source for the table to render
    this.getAppointments(new Date(),1);
    
  }

  //By-default method for Tables sort and paging
   ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

   async getAppointments(date: Date, pId: number): Promise<boolean>{
    this.appointmentService.getAppointmentOn(date,pId).subscribe((res: any)=>{
      this.appointments = res._embedded.appointmentList;
      this.dataSource = new MatTableDataSource(this.appointments);
      this.appointmentsLoaded = Promise.resolve(true);      
      console.log(this.appointments);
    });
    return this.appointmentsLoaded;
   }

  changeSelected(appointment: Appointment){
     this.physicianService.changeAppointment(appointment);
   }
    
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
  
  
  