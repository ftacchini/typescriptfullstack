import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../friends.service';
import {IFriend} from 'domain-models/IFriend';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css'],
  providers: [FriendsService]
})
export class FriendListComponent implements OnInit {

  public friendList: IFriend[];

  constructor(private friendService: FriendsService) { }

  ngOnInit() {
    this.getFriendList();
  }

  public getFriendList(): void {
    this.friendService.getHeroes()
    .subscribe(
      friends => this.friendList = friends,
      error => console.log(error)
    )
  }

}
