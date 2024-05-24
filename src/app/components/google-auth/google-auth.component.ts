// google-auth.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User, { UserResponse } from '../../Interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-auth',
  standalone: true,
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css'],
  imports: [],
})
export class GoogleAuthComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.parseAndSendTokens();
  }

  private parseAndSendTokens() {
    const fragment = window.location.hash.substring(1);
    const params = new URLSearchParams(fragment);
    const accessToken = params.get('access_token');
    const idToken = params.get('id_token');
    const expiresIn = params.get('expires_in');
    const tokenType = params.get('token_type');
    const scope = params.get('scope');
    console.log(idToken);
    if (accessToken && idToken) {
      const tokenData = {
        accessToken,
        idToken,
        expiresIn,
        tokenType,
        scope,
      };

      this.http
        .post<UserResponse<User>>(
          'http://localhost:3000/api/users/handleGoogleAuth',
          {
            idToken: idToken,
          }
        )
        .subscribe(
          (res) => {
            this;
            this.router.navigate([`contacts/${res.data._id}`]);
          },
          (error) => {
            console.error('Error sending tokens', error);
          }
        );
    } else {
      console.error('Missing tokens');
    }
  }
}
