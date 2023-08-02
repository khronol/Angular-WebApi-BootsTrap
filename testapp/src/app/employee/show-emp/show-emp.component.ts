import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

constructor(private service:SharedService) {}

  EmployeeList:any=[]


  ModalTitle!: string;
  ActivateAddEditEmpComp:boolean=false;
  emp:any;

  EmployeeIdFilter:string="";
  EmployeeNameFilter:string="";
  EmployeeDateOfBirthFilter:string="";
  EmployeeFirstWorkDayFilter:string="";
  EmployeeSalaryFilter:string="";
  EmployeeListWithoutFilter:any=[];

ngOnInit(): void {
  this.refreshEmployeeList();
}

addClick(){
this.emp={
  EmployeeID:0,
  EmployeeName:"",
  EmployeeDateOfBirth:"",
  EmployeeFirstWorkDay:"",
  EmployeeSalary:0
}
this.ModalTitle="Add Employee";
this.ActivateAddEditEmpComp=true;
}

closeClick(){
  this.ActivateAddEditEmpComp=false;
  this.refreshEmployeeList();
}

editClick(item:any){
this.emp=item;
this.ModalTitle="Edit Employee";
this.ActivateAddEditEmpComp=true;
}

deleteClick(item:any){
  if(confirm('Are you sure??')){
    this.service.deleteEmployee(item.EmployeeID).subscribe(data=>{
      alert(data.toString());
      this.refreshEmployeeList();
    })
  }
}

refreshEmployeeList(){
  this.service.getEmpList().subscribe(data=>{
    this.EmployeeList=data;
    this.EmployeeListWithoutFilter=data;
  });
}
FilterFn(){
  var EmployeeIdFilter = this.EmployeeIdFilter;
  var EmployeeNameFilter = this.EmployeeNameFilter;
  var EmployeeDateOfBirthFilter = this.EmployeeDateOfBirthFilter;
  var EmployeeFirstWorkDayFilter = this.EmployeeFirstWorkDayFilter;
  var EmployeeSalaryFilter = this.EmployeeSalaryFilter;

  this.EmployeeList = this.EmployeeListWithoutFilter.filter(function (el:any){
    return el.EmployeeID.toString().toLowerCase().includes(
      EmployeeIdFilter.toString().trim().toLowerCase()
    )&&
    el.EmployeeName.toString().toLowerCase().includes(EmployeeNameFilter.toString().trim().toLowerCase())&&
    el.EmployeeDateOfBirth.toString().toLowerCase().includes(EmployeeDateOfBirthFilter.toString().trim().toLowerCase())&&
    el.EmployeeFirstWorkDay.toString().toLowerCase().includes(EmployeeFirstWorkDayFilter.toString().trim().toLowerCase())&&
    el.EmployeeSalary.toString().toLowerCase().includes(EmployeeSalaryFilter.toString().trim().toLowerCase())
  })
}
}
