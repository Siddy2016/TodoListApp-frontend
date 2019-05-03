import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  public baseUrl = 'http://localhost:3000/api/v1.0';
  public deleteid: String;
  public deletetask: String;

  constructor(
    public http:HttpClient
  ) { }

  //SIGN-UP Function:

  public signupFunction(data):Observable<any>{
    const params = new HttpParams()
    .set('email',data.email)
    .set('textPassword',data.textPassword)
    .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('mobileNumber',data.mobileNumber)
    .set('countryCode',data.countryCode)
    return this.http.post(`${this.baseUrl}/signup`,params);
  }

  //LOG-IN Function:

public loginFunction(data):Observable<any>{
  const params = new HttpParams()
  .set('email',data.email)
  .set('textPassword',data.textPassword)
  return this.http.post(`${this.baseUrl}/login`,params);
}

//Forgot Password:
public forgotPassword(email):Observable<any>{
  const params = new HttpParams()
  .set('email',email)
  return this.http.post(`${this.baseUrl}/restore`,params);
}

//Delete Account
public removeAccount=(userID)=>{
  return this.http.delete(`${this.baseUrl}/deleteuser/${userID}`);

}

//Creating a new Todo List:
public createTodo = (data) => {
  const params = new HttpParams()
    .set("name", data.name)
    .set("description", data.description)
    .set("createdBy", data.createdBy)
  return this.http.post(`${this.baseUrl}/create`, params)
}

//Getting All Todo List:
public getAlltodo = () => {
  return this.http.get(`${this.baseUrl}/alltodo`);
}

//Removing  todo List:
public removetodolist = (id) => {
  this.deleteid = id;
  return this.http.delete(`${this.baseUrl}/delete/${this.deleteid}`);
}

//Get Tasks
public getTasks = () => {
  return this.http.get(`${this.baseUrl}/alltask`);
}

//Create A New Task:
public createnewtask = (data) => {
  const params = new HttpParams()
    .set("listid", data.listid)
    .set("taskName", data.taskName)
  return this.http.post(`${this.baseUrl}/createtask`, params);
}


//Delete A single task:
public deletesingletask = (id) => {
  this.deletetask = id;
  return this.http.delete(`${this.baseUrl}/deletetask/${this.deletetask}`);
}

//Delete Many Task:
public deleteMany = (id) => {
  return this.http.delete(`${this.baseUrl}/deletemany/${id}`);
}

//Get All Users:
public getAllpeople = () => {
  return this.http.get(`${this.baseUrl}/all`)
}
}
