import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../Entity/employee';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  employee: Employee = new Employee();
  id: number = 0
  createForm!: FormGroup
  usernameExisted?: string
  submitted: boolean = false

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
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
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data
    })
  }

  goToEmployeeList() {
    this.router.navigate([''])
  }

  onSubmit(){

    this.employeeService.checkUsername(this.employee).subscribe(data => {
      if(data===null){
        if(!this.createForm.valid) {
          this.createForm.markAllAsTouched();
        }else{
          this.employeeService.updateEmployee(this.id, this.employee).subscribe(data => {
            this.goToEmployeeList()
          })
        }
      } else {
        console.log("Username đã tồn tại");
        this.usernameExisted="Username đã tồn tại"
      }
    })

    // this.employeeService.updateEmployee(this.id, this.employee).subscribe(data => {
    //   this.goToEmployeeList()
    // })
  }

}
