import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../friends.service';
import {AuthService} from 'ng2-ui-auth';
import {IFriend} from 'domain-models/IFriend';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isLogged: boolean = false;
  private nameFilter: string;

  constructor(private auth: AuthService, private friendsService: FriendsService) { }

  ngOnInit() {
  }

  login(): void{
    this.auth.authenticate('facebook')
            .subscribe({
                error: (error) => {
                  console.log('error')
                },
                complete: () => {
                  this.isLogged = true;
                  console.log('test');
                }
            });
  }

  logout(): void{
    this.auth.logout();
    this.isLogged = false;
  }

  search(): void{
    this.friendsService
      .setFilter((friend: IFriend) => friend.name.indexOf(this.nameFilter) > -1 );
  }

}
