import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})
export class CalendarPage {

  constructor(private googleAuth: AuthService) {}

  async onLogin() {
    try {
      this.googleAuth.onLogin();
    } catch (error) {
      console.log(error)
    }
  }
}
