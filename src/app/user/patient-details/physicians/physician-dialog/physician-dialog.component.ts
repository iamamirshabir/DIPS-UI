import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/shared/classes';
import { UserService } from 'src/app/user/user.service';
import { PhysicianDialogService } from './physician-dialog.service';

export interface DialogData {
  available: string;
  name: string;
  address: string;
  id: number;
  time_start: number;
  time_end: number;
}

@Component({
  selector: 'app-physician-dialog',
  templateUrl: './physician-dialog.component.html',
  styleUrls: ['./physician-dialog.component.css'],
})
export class PhysicianDialogComponent implements OnInit {
  days: number[];
  availability: string = '';
  invalidDays: number[] = [0, 0, 0, 0, 0, 0, 0];
  validDays: number[] = [];
  appointment: Appointment;

  minDate: Date;
  maxDate: Date;

  constructor(
    public dialogRef: MatDialogRef<PhysicianDialogComponent>,
    private userService: UserService,
    private physicianDialogService: PhysicianDialogService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.days = this.data.available.split(',', 6).map(Number);

    if (this.days[1] == 1) {
      this.availability = this.availability + '-Monday ';
    } else this.invalidDays[1] = 1;

    if (this.days[2] == 1) {
      this.availability = this.availability + '-Tuesday';
    } else this.invalidDays[2] = 2;

    if (this.days[3] == 1) {
      this.availability = this.availability + '-Wednesday';
    } else this.invalidDays[3] = 3;

    if (this.days[4] == 1) {
      this.availability = this.availability + '-Thursday';
    } else this.invalidDays[4] = 4;

    if (this.days[5] == 1) {
      this.availability = this.availability + '-Friday';
    } else this.invalidDays[5] = 5;

    if (this.days[6] == 1) {
      this.availability = this.availability + '-Friday';
    } else this.invalidDays[6] = 6;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + 14);
  }

  ngOnInit(): void {}
  myDateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();

    return (
      day !== this.invalidDays[0] &&
      day !== this.invalidDays[1] &&
      day !== this.invalidDays[2] &&
      day !== this.invalidDays[3] &&
      day !== this.invalidDays[4] &&
      day !== this.invalidDays[5] &&
      day !== 0
    );
  };
  onNoClick(): void {
    this.dialogRef.close();
  }

  //method to make an appointment
  makeAppointment() {
    this.appointment = new Appointment();
    this.appointment.appointment_on = new Date().toISOString().split('T')[0];
    this.physicianDialogService
      .setAppointment(
        this.appointment,
        this.userService.userAc.userac_id,
        this.data.id
      )
      .subscribe((resp: any) => {
        if (resp != null) {
          this.appointment = resp;
          this.physicianDialogService.generatePdf(this.appointment);
        }
      });
  }
}
