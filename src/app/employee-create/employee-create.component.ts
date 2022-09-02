import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../Entity/employee';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  employee: Employee = new Employee()
  createForm!: FormGroup
  usernameExisted?: string
  submitted: boolean = false

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      address: ['', Validators.required],
      age: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get form(){
    return this.createForm.controls
  }

  ngOnInit(): void {
    
  }

  saveEmployee() {

    this.employeeService.checkUsername(this.employee).subscribe(data => {
      if(data===null){
        if(!this.createForm.valid) {
          this.createForm.markAllAsTouched();
        }else{
          this.employeeService.createEmployee(this.employee).subscribe(data => {
            console.log(data);
            this.goToEmployeeList()
          })
        }
      } else {
        console.log("Username đã tồn tại");
        this.usernameExisted="Username đã tồn tại"
      }
    })
  }

  goToEmployeeList() {
    this.router.navigate([''])
  }

  onSubmit(){
    this.saveEmployee();
  }
}
