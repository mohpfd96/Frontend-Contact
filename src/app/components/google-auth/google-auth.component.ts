import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User, { UserResponse } from '../../Interfaces/user.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-google-auth',
  standalone: true,
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css'],
  imports: [],
})
export class GoogleAuthComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.parseAndSendTokens();
  }

  parseAndSendTokens() {
    const fragment = window.location.hash.substring(1); //after #
    const params = new URLSearchParams(fragment);
    /*
    const accessToken = params.get('access_token');
    const expiresIn = params.get('expires_in');
    const tokenType = params.get('token_type');
    const scope = params.get('scope');
    */
    const idToken = params.get('id_token');
    if (idToken) {
      this.http
        .post<UserResponse<User>>(
          'http://localhost:3000/api/users/handleGoogleAuth',
          {
            idToken: idToken,
          }
        )
        .subscribe(
          (res) => {
            this.toastr.success('Sign in Successful!', 'Success', {
              progressBar: true,
              closeButton: true,
            });
            this.router.navigate([`contacts/${res.data._id}`]);
          },
          (error) => {
            this.toastr.error(
              'Something wrong with token from google!',
              'Error',
              {
                progressBar: true,
                closeButton: true,
              }
            );
          }
        );
    } else {
      this.toastr.error('Are you sure u login with google?!', 'Error', {
        progressBar: true,
        closeButton: true,
      });
    }
  }
}
