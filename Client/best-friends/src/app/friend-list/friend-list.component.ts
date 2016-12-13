import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../friends.service';
import {IFriend} from 'domain-models/IFriend';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  public friendList: Observable<IFriend[]>;

  constructor(private friendService: FriendsService) { }

  ngOnInit() {
    this.getFriendList();
  }

  public getFriendList(): void {
    this.friendList = this.friendService.friendsSource;
  }

}
