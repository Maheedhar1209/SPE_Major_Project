import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  otp_verify=true;
  verifyotppage(){
    this.otp_verify=false;
  }
}
