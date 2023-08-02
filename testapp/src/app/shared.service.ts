import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "https://localhost:44370/api";

  constructor(private http:HttpClient) { }

  getEmpList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+"/Home");
  }
  addEmployee(val:any){
    return this.http.post(this.APIUrl+"/Home",val);
  }
  updateEmployee(val:any){
    return this.http.put(this.APIUrl+"/Home",val);
  }
  deleteEmployee(val:any){
    return this.http.delete(this.APIUrl+"/Home/"+val);
  }
}
