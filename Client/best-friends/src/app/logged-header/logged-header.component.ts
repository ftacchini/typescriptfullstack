import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../friends.service';
import {AuthService} from 'ng2-ui-auth';
import {IFriend} from 'domain-models/IFriend';
import { Router } from '@angular/router';

@Component({
  selector: 'logged-header',
  templateUrl: './logged-header.component.html',
  styleUrls: ['./logged-header.component.css']
})
export class LoggedHeaderComponent implements OnInit {
  private nameFilter: string;

  constructor(private auth: AuthService, private friendsService: FriendsService, private router: Router) { }


  ngOnInit() {
  }

  logout(): void{
    this.auth.logout()
        .subscribe({
          error: (error) => {
            console.log('error')
          },
          complete: () => {
            this.router.navigate(['']);
          }
        });
  }

  search(): void{
    this.friendsService
      .setFilter((friend: IFriend) => friend.name.indexOf(this.nameFilter) > -1 );
  }

}
