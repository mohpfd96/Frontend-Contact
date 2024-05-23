import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import User, { UserResponse } from '../../Interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

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

  signIn() {
    this.userService
      .getUser(this.signInCredential.email, this.signInCredential.password)
      .subscribe({
        next: (res: UserResponse<User>) => {
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
    console.log('google.');
  }
}
