import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  input,
} from '@angular/core';
import Contact from '../../Interfaces/contact.interface';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  @Input() userId!: string;
  @Input() updateOrInsert!: 'update' | 'insert';
  @Input() contact: Contact = {
    userId: '',
    firstName: '',
    lastName: '',
    phoneNumbers: {
      number: '',
    },
    category: '',
  };
  @Output() onCloseModel = new EventEmitter();
  discardForm() {
    this.resetForm();
    this.onCloseModel.emit(false);
  }
  submitForm() {
    this.createContactOrUpdate();
  }
  private contactService: ContactService = inject(ContactService);
  private toastr: ToastrService = inject(ToastrService);

  createContactOrUpdate() {
    if (this.updateOrInsert === 'insert') {
      this.contactService.createContact(this.userId, this.contact).subscribe({
        next: (res) => {
          this.discardForm();
          this.resetForm();
          this.toastr.success(res.message, 'Successful', {
            progressBar: true,
            closeButton: true,
          });
        },
        error: (err) => {
          console.log(err),
            this.toastr.error(err.error.message, 'Error', {
              progressBar: true,
              closeButton: true,
            });
        },
      });
    } else if (this.updateOrInsert === 'update') {
      this.contactService
        .updateContact(this.contact._id, this.contact)
        .subscribe({
          next: (res) => {
            this.toastr.success(res.message, 'Successful', {
              progressBar: true,
              closeButton: true,
            });
            this.discardForm();
            this.resetForm();
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
  }

  resetForm() {
    this.contact = {
      userId: '',
      firstName: '',
      lastName: '',
      phoneNumbers: { number: '', type: '' },
      address: '',
      category: '',
      company: '',
      email: '',
      notes: '',
      profileImage: '',
    };
  }
}
