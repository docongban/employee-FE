import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../Entity/employee';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = []

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllEmployees()
  }

  getAllEmployees(){
    this.employeeService.getEmployeeList().subscribe(data => {
      this.employees = data
    })
  }

  updateEmployee(id: any){
    this.router.navigate(['employee-update', id])
  }

  deleteEmployee(id: any){
    this.employeeService.deleteEmployee(id).subscribe(data => {
      this.getAllEmployees()
    })
  }
}
