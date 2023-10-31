/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'angular-vite-student',
  templateUrl: './student.component.html',
})
export class StudentComponent {
  StudentArray: any[] = [];
  currentStudentID = '';
  name = '';
  address = '';
  phone = '';
  searchText = '';

  constructor(private http: HttpClient) {
    this.getAllStudent();
  }

  getAllStudent() {
    return this.http.get<any>('http://localhost:5000/students').subscribe(
      (resultData) => {
        console.log(resultData);
        this.StudentArray = resultData;
      },
      (error) => {
        console.log(error);
        alert('Error Found!');
      }
    );
  }
  setUpdate(data: any) {
    this.name = data.name;
    this.address = data.address;
    this.phone = data.phone;
    this.currentStudentID = data._id;
  }
  UpdateRecords() {
    const bodyData = {
      name: this.name,
      address: this.address,
      phone: this.phone,
    };

    this.http
      .patch(
        'http://localhost:5000/students' + '/' + this.currentStudentID,
        bodyData
      )
      .subscribe((resultData: any) => {
        console.log(resultData);

        this.getAllStudent();
      });
  }

  setDelete(data: any) {
    this.http
      .delete('http://localhost:5000/students' + '/' + data._id)
      .subscribe((resultData: any) => {
        console.log(resultData);

        this.getAllStudent();
      });
  }

  save() {
    if (this.currentStudentID == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }
  register() {
    const bodyData = {
      name: this.name,
      address: this.address,
      phone: this.phone,
    };
    this.http
      .post('http://localhost:5000/student/create', bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);

        this.name = '';
        this.address = '';
        this.phone = '';
        this.getAllStudent();
      });
  }
}
