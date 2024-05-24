import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ContactTableComponent } from './components/contact-table/contact-table.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { GoogleAuthComponent } from './components/google-auth/google-auth.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'contacts/:userId',
    component: ContactTableComponent,
  },
  {
    path: 'google_auth',
    component: GoogleAuthComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
