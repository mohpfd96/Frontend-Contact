import { Component, OnInit, inject, input } from '@angular/core';
import contact from '../../Interfaces/contact.interface';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-table',
  standalone: true,
  imports: [],
  templateUrl: './contact-table.component.html',
  styleUrl: './contact-table.component.css',
})
export class ContactTableComponent implements OnInit {
  contacts!: contact[];
  userId!: string;
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (res) => {
        this.userId = res['userId'];
      },
      error: (err) => console.log(err),
    });
    this.getAllContact();
  }

  private userService: ContactService = inject(ContactService);
  getAllContact() {
    this.userService.getAllContact(this.userId).subscribe({
      next: (res) => {
        if (res.data) {
          this.contacts = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
