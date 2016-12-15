import { Component, OnInit } from '@angular/core';
import { AuthService } from 'ng2-ui-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['friends']);
    }
    else {
      this.auth.authenticate('facebook')
        .subscribe({
          error: (error) => {
            console.log('error')
          },
          complete: () => {
            this.router.navigate(['friends']);
          }
        });
    }
  }

}
