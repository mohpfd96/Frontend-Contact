import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Contact, { ContactResponse } from '../Interfaces/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  API = 'http://localhost:3000/api/contacts';
  constructor(private http: HttpClient) {}

  getAllContact(userId: string): Observable<ContactResponse<Contact[]>> {
    return this.http.get<ContactResponse<Contact[]>>(`${this.API}/${userId}`);
  }

  getContact(id: string): Observable<ContactResponse<Contact>> {
    return this.http.get<ContactResponse<Contact>>(`${this.API}/${id}`);
  }

  createContact(contact: Contact): Observable<any> {
    return this.http.post(`${this.API}`, contact);
  }

  updateContact(id: string, contact: Contact): Observable<any> {
    return this.http.put(`${this.API}/${id}`, contact);
  }

  deleteContact(id: string): Observable<ContactResponse<any>> {
    return this.http.delete<ContactResponse<any>>(`${this.API}/${id}`);
  }
}
