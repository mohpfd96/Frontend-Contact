import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import User, { UserResponse } from '../../Interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/oauth2.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  signInCredential: User = {
    username: '',
    email: '',
    password: '',
    profileImage: '',
    remember: false,
  };
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);
  private toastr: ToastrService = inject(ToastrService);
  private authService: AuthService = inject(AuthService);

  signIn() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.signInCredential.email)) {
      this.toastr.error('Invalid email format!', 'Error', {
        progressBar: true,
        closeButton: true,
      });
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(this.signInCredential.password)) {
      this.toastr.error(
        'Password must be at least 8 Digits include 1 letter + 1 symbol.',
        'Error',
        {
          progressBar: true,
          closeButton: true,
        }
      );
      return;
    }

    this.userService
      .getUser(this.signInCredential.email, this.signInCredential.password)
      .subscribe({
        next: (res: UserResponse<User>) => {
          this.toastr.success('Sign in Successful!', 'Success', {
            progressBar: true,
            closeButton: true,
          });
          this.router.navigate([`/contacts/${res.data._id}`]);
        },
        error: (err: any) => {
          console.log(err.error.message);
          this.toastr.error(err.error.message, 'Error', {
            progressBar: true,
            closeButton: true,
          });
        },
      });
  }
  signUp() {
    this.router.navigate(['/sign-up']);
  }
  signInGoogle() {
    console.log('google');
    this.authService.login();
  }
}
