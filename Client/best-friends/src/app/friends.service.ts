import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IFriend} from 'domain-models/IFriend';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FriendsService {

  private friendsUrl: string = 'http://localhost:4200/api/friends'; 
  private data: IFriend[];
  private filter: (friend: IFriend) => boolean = (friend: IFriend) => true;
  private friendsSubject = new Subject<IFriend[]>();
  
  constructor (private http: Http) {
    this.getFriends();
  }

  public friendsSource = this.friendsSubject.asObservable()
    .map((friends) => this.filterData(friends));


  getFriends () {
    this.http.get(this.friendsUrl)
      .map(this.extractData)
      .subscribe((data) => this.setData(data));
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private setData(friends: IFriend[]){
    this.data = friends;
    this.pushData(friends);
  }

  public setFilter(filter: (friend: IFriend) => boolean){
    this.filter = filter;
    this.pushData(this.data);
  }

  private filterData(data: IFriend[]): IFriend[]{
      return data.filter(this.filter);
  }

  private pushData(data: IFriend[]){
    this.friendsSubject
      .next(data);
  }
}
