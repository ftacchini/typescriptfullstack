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

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(): void{
    this.auth.authenticate('facebook')
            .subscribe({
                error: (error) => {
                  console.log('error')
                },
                complete(): (value: Response) => {
                  console.log('test');
                }
            });
  }

  search(friendName: string): void{
    //implement
  }

}
