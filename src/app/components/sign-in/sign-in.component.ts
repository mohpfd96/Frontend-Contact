import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import User, { UserResponse } from '../../Interfaces/user.interface';
import { UserService } from '../../services/user.service';

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
  userService: UserService = inject(UserService);

  signIn() {
    this.userService
      .getUser(this.signInCredential.email, this.signInCredential.password)
      .subscribe({
        next: (res: UserResponse<User>) => {
          this.router.navigate([`/contacts/${res.data._id}`]);
        },
        error: (err: any) => {
          console.log(err.error.message);
        },
      });
  }
  signUp() {
    this.router.navigate(['/sign-up']);
  }
  signInGoogle() {
    console.log('google.');
  }
}
