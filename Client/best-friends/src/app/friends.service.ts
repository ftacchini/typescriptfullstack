import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class FriendsService {

  private friendsUrl: string = 'http://localhost:4200/api/friends'; 

  constructor (private http: Http) {}

  getHeroes (): Observable<any[]> {
    return this.http.get(this.friendsUrl)
                    .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

}
