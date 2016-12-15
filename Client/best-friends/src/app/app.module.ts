import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { DataTableModule } from 'primeng/primeng';
import { HeaderComponent } from './header/header.component';

import { Ng2UiAuthModule, CustomConfig } from 'ng2-ui-auth';
import { IOauth2Options } from '../../node_modules/ng2-ui-auth/src/config.service'
import { FriendsService } from './friends.service';
import { AuthGuard } from './auth-guard.service';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from "./app-routing.module";
import { LoggedHeaderComponent } from './logged-header/logged-header.component';
import { LoggedHomeComponent } from './logged-home/logged-home.component';

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
    HeaderComponent,
    HomeComponent,
    FriendListComponent,
    LoggedHomeComponent,
    LoggedHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    AppRoutingModule,
    Ng2UiAuthModule.getWithConfig(MyAuthConfig),
  ],
  providers: [FriendsService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
