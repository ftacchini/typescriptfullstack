import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoggedHomeComponent } from './logged-home/logged-home.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'friends', pathMatch: 'full', component: LoggedHomeComponent, canActivate: [AuthGuard] }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
