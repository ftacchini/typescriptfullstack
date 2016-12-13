import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../friends.service';
import {AuthService} from 'ng2-ui-auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [FriendsService]
})
export class HeaderComponent implements OnInit {
  private isLogged: boolean = false;

  constructor(private auth: AuthService) { }

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

  search(friendName: string): void{
    //implement
  }

}
