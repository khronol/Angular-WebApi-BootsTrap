import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit{
constructor(private service:SharedService) {}

@Input() emp:any;
  EmployeeID?:number;
  EmployeeName:string;
  EmployeeDateOfBirth:string;
  EmployeeFirstWorkDay:string;
  EmployeeSalary:string;

  EmployeeList:any=[];
ngOnInit(): void{
  this.loadData()
}

loadData(){
  this.service.getEmpList().subscribe((data:any)=>{
    this.EmployeeList = data;

    this.EmployeeID=this.emp.EmployeeID;
    this.EmployeeName=this.EmployeeName;
    this.EmployeeDateOfBirth=this.EmployeeDateOfBirth;
    this.EmployeeFirstWorkDay=this.EmployeeFirstWorkDay;
    this.EmployeeSalary=this.EmployeeSalary;
  });
}

addEmployee(){
  var val = {
    EmployeeID:this.EmployeeID,
    EmployeeName:this.EmployeeName,
    EmployeeDateOfBirth:this.EmployeeDateOfBirth,
    EmployeeFirstWorkDay:this.EmployeeFirstWorkDay,
    EmployeeSalary:this.EmployeeSalary,}
    this.service.addEmployee(val).subscribe(res=>alert(res.toString()));
}
updateEmployee(){
  var val = {
    EmployeeID:this.EmployeeID,
    EmployeeName:this.EmployeeName,
    EmployeeDateOfBirth:this.EmployeeDateOfBirth,
    EmployeeFirstWorkDay:this.EmployeeFirstWorkDay,
    EmployeeSalary:this.EmployeeSalary,}
    this.service.updateEmployee(val).subscribe(res=>alert(res.toString()));
}
}
