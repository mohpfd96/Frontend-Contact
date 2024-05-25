import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ModalComponent } from '../modal/modal.component';
import Contact from '../../Interfaces/contact.interface';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-table',
  standalone: true,
  imports: [CommonModule, ContactFormComponent, ModalComponent, FormsModule],
  templateUrl: './contact-table.component.html',
  styleUrl: './contact-table.component.css',
})
export class ContactTableComponent implements OnInit {
  updateOrInsert: 'insert' | 'update' = 'insert';
  contact: Contact = {
    userId: '',
    firstName: '',
    lastName: '',
    phoneNumbers: {
      number: '',
    },
    category: '',
  };
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  userId!: string;
  categories: string[] = [];
  searchText: string = '';
  selectedCategories: Set<string> = new Set();
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private userService: ContactService = inject(ContactService);
  private toastr: ToastrService = inject(ToastrService);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (res) => {
        this.userId = res['userId'];
        this.getAllContact();
      },
      error: (err) => {
        console.log(err),
          this.toastr.error(err.error.message, 'Error', {
            progressBar: true,
            closeButton: true,
          });
      },
    });
  }

  getAllContact() {
    this.userService.getAllContact(this.userId).subscribe({
      next: (res) => {
        if (res.data) {
          this.contacts = res.data;
          this.filteredContacts = res.data;
        }
        this.distinctCategories();
        this.filterContacts();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error', {
          progressBar: true,
          closeButton: true,
        });
      },
    });
  }

  deleteContact(id: string | undefined) {
    this.userService.deleteContact(id).subscribe({
      next: (res) => {
        this.toastr.warning('Delete Successful!', 'Warning', {
          progressBar: true,
          closeButton: true,
        });
        this.getAllContact();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error', {
          progressBar: true,
          closeButton: true,
        });
      },
    });
  }

  isModelOpen = false;

  distinctCategories() {
    const categorySet = new Set<string>();
    for (const contact of this.contacts) {
      if (contact.category) {
        categorySet.add(contact.category);
      }
    }
    this.categories = Array.from(categorySet);
  }
  addContact() {
    this.isModelOpen = true;
    this.updateOrInsert = 'insert';
  }
  editContact(inputContact: Contact) {
    this.updateOrInsert = 'update';
    this.contact = inputContact;
    this.isModelOpen = true;
  }
  closeModel() {
    this.isModelOpen = !this.isModelOpen;
    this.getAllContact();
  }
  filterContacts() {
    const filteredByText = this.contacts.filter(
      (contact) =>
        contact.firstName
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        contact.lastName
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        contact.phoneNumbers.number.includes(this.searchText) ||
        contact.category.toLowerCase().includes(this.searchText.toLowerCase())
    );

    if (this.selectedCategories.size === 0) {
      this.filteredContacts = filteredByText;
    } else {
      this.filteredContacts = filteredByText.filter((contact) =>
        this.selectedCategories.has(contact.category)
      );
    }
  }

  toggleCategorySelection(category: string) {
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }
    this.filterContacts();
  }
}
