import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Entity/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'https://be-employee.herokuapp.com/api/v1/employees'

  constructor(
    private httpClient: HttpClient
  ) { }

  checkUsername(employee: Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(`https://be-employee.herokuapp.com/api/v1/usernameExists`, employee)
  }

  getEmployeeList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseUrl}`)
  }

  createEmployee(employee: Employee): Observable<Employee[]>{
    return this.httpClient.post<Employee[]>(`${this.baseUrl}`, employee)
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`)
  }

  updateEmployee(id: number, employee: Employee): Observable<Object>{
    return this.httpClient.put<Employee>(`${this.baseUrl}`, employee)
  }

  deleteEmployee(id: number): Observable<Object>{
    return this.httpClient.delete<Employee>(`${this.baseUrl}/${id}`)
  }
}
