import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import {DataTableModule} from 'primeng/primeng';
import { HeaderComponent } from './header/header.component';

import {Ng2UiAuthModule, CustomConfig} from 'ng2-ui-auth';
import {IOauth2Options} from '../../node_modules/ng2-ui-auth/src/config.service'
import { FriendsService } from './friends.service';

export const FACEBOOK_CLIENT_ID = '1145728795523925';
export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    providers: { [provider: string]: IOauth2Options } = {
      facebook: {
        clientId: FACEBOOK_CLIENT_ID
      }
    };
}

@NgModule({
  declarations: [
    AppComponent,
    FriendListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    Ng2UiAuthModule.getWithConfig(MyAuthConfig),
  ],
  providers: [FriendsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
