import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import User, { UserResponse } from '../../Interfaces/user.interface';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  term: boolean = false;
  signUpCredential: User = {
    username: '',
    email: '',
    password: '',
    profileImage: '',
    remember: false,
  };
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  private toastr: ToastrService = inject(ToastrService);

  signUp() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.signUpCredential.email)) {
      this.toastr.error('Invalid email format!', 'Error', {
        progressBar: true,
        closeButton: true,
      });
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(this.signUpCredential.password)) {
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
    const usernameRegex = /\w{5,}/;

    if (!usernameRegex.test(this.signUpCredential.username)) {
      this.toastr.error(
        'Username must contain at least 5 letters, numbers, or underscores.',
        'Error',
        {
          progressBar: true,
          closeButton: true,
        }
      );
      return;
    }

    console.log(usernameRegex.test(this.signUpCredential.username));

    if (!this.term) {
      this.toastr.error(
        'Agree with Terms, we dont have yet but check it 😂',
        'Error',
        {
          progressBar: true,
          closeButton: true,
        }
      );
      return;
    }

    this.userService.createUser(this.signUpCredential).subscribe({
      next: (res: UserResponse<User>) => {
        console.log(res);
        this.toastr.success('Sign Up Successful!', 'Success', {
          progressBar: true,
          closeButton: true,
        });
        this.router.navigate([`contacts/${res.data._id}`]);
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

  signIn() {
    this.router.navigate(['/sign-in']);
  }
  TermCheck(event: any) {
    this.term = event.target.checked;
    console.log(event.target.checked);
  }
}
