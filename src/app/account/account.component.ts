import { Component, OnInit } from '@angular/core';
import {User} from '../user';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  currMakingAcc = true;
  email = "";
  first = "";
  last = "";


  newUser: User = {
     email: this.email,
     firstName: this.first,
     lastName: this.last
  };

  constructor() { }

  ngOnInit() {
  }
  
  finishMakingAcc() {
     this.currMakingAcc = false;
  }

}
