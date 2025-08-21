import { Injectable } from '@angular/core';
import { Contact } from '../../models/interface/contact.interface';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];

  public addContact(contact: Contact) {
    contact.id = this.contacts.length + 1;
    this.contacts.push(contact);
    this.saveToLocalStorage();
  }

  public editContact(contact: Contact) {
    const index = this.contacts.findIndex((c) => c.id === contact.id);
    this.contacts[index] = contact;
    this.saveToLocalStorage();
  }

  public deleteContact(id: number) {}

  public getAllContacts() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.contacts = JSON.parse(savedContacts);
      this.contacts.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
  private saveToLocalStorage(): void {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }
}
