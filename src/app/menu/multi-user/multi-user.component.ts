import { Component, OnInit } from '@angular/core';
import { Socket1Service } from './../../socket1.service';
import { Cookie } from 'ng2-cookies';
import { AppService } from './../../app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multi-user',
  templateUrl: './multi-user.component.html',
  styleUrls: ['./multi-user.component.css']
})
export class MultiUserComponent implements OnInit {

  public token: String;
  public users;
  public name: String;
  public description: String;
  public taskList;
  public value: Boolean = true;
  public taskName: String;
  public alltasks;

  //Cookie
  public userId: String;
  public userName: String;
  public listId: String;
  public listName: String

  constructor(
    public socketService: Socket1Service, 
    public appService: AppService, 
    public toastr: ToastrService,
    public router: Router
  ) { }

  ngOnInit() {
    this.token = Cookie.get('token')
    this.userId = Cookie.get("id");
    this.userName = Cookie.get("fullName");
  
    this.verifyUserConfirmation();
    this.onlineUsers();

    this.getAlltask();
    this.getAllLists();
    
    this.newListResponse();
    this.addTaskresponse();
    this.deleteres();
    this.deletelistres();
  }

    //User Confirmation:

    public verifyUserConfirmation = () => {
      this.socketService.verifyUser().subscribe((response) => {
        this.socketService.setUser(this.token);
        console.log("User Is Verified");
  
      })
    }
    public onlineUsers = () => {
      this.socketService.getOnlineUsers().subscribe((response) => {
        this.users = response
        console.log(this.users);
      })
    }
  
    //Adding List : 
  
    public newlist = () => {
      if (this.name == undefined || this.name == "")
        return this.toastr.warning("Enter Name")
      else {
        let listData = {
          name: this.name,
          description: this.description,
          createdBy: this.userName,
          group: this.value
        }
        this.socketService.createNewList(listData)
        
      }
  
    }
    public newListResponse = () => {
      this.socketService.createlistresponse().subscribe((response) => {
        this.toastr.success(response);
        this.getAllLists();
      })
    }
  
    public getAllLists = () => {
      this.appService.getAlltodo().subscribe((response: any) => {
        this.taskList = response.data;
        console.log(this.taskList)
      })
    }
  
    //Adding Task:
  
    public selectList = (id, name) => {
      this.listId = id;
      this.listName = name;
      console.log(this.listId, this.listName);
    }
    public addTask = () => {
      if(this.listId=="" ||this.listId==undefined||this.listId==null){
        return this.toastr.warning("Select List")
      }
      else{}
      if(this.taskName=="" ||this.taskName==undefined ||this.taskName==null){
       return this.toastr.warning("Enter Task")
      }
      else{
      let data = {
        listId: this.listId,
        taskName: this.taskName
      }
      this.socketService.createtask(data)
    }
    }
    public addTaskresponse = () => {
      this.socketService.taskResponse().subscribe((socketResponse) => {
        this.toastr.info(socketResponse)
        this.taskName = ""
        this.getAlltask();
      })
    }
    public getAlltask = () => {
      this.appService.getTasks().subscribe((apiResponse: any) => {
        this.alltasks = apiResponse.data;
        console.log(this.alltasks)
      })
    }
    public deleteTask = (id) => {
      let data = {
        id: id,
        name: this.userName
      }
      this.socketService.deleteUniqueTask(data)
      
    }
    public deleteres = () => {
      this.socketService.deleteResponse().subscribe((apiResponse: any) => {
        this.toastr.success(apiResponse);
        this.getAlltask();
      })
    }
    public deletelist = (id, name) => {
      let data = {
        id: id,
        name: name
      }
      this.socketService.deletethelist(data)
      this.appService.deleteMany(id).subscribe((apiResponse: any) => {
        this.toastr.success(apiResponse.message)
      }, err => {
        console.log(err)
      })
    }
    public deletelistres = () => {
      this.socketService.deletelistRes().subscribe((apiResponse: any) => {
        this.toastr.success(apiResponse);
        this.listName=""
        this.listId=""
        this.getAllLists();
        this.getAlltask();
  
      })
  
    }


  public gotologin = () => {
    this.router.navigate(['/login'])
  }


    public logout=()=>{
      Cookie.delete("listid")
      Cookie.delete("listname")
      Cookie.delete('fullName');
      Cookie.delete('id')
      Cookie.delete("token");
      this.gotologin()
    }
  

}
