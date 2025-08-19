import { Component, signal, input, Input } from '@angular/core';
import { Contact } from './models/interface/contact.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('contact-card-list');
  ngOnInit() {
    this.loadContacts();
  }

  isFormVisible: boolean = false;
  contactList: Contact[] = [];
  contactToEdit!: Contact;

  public addOrUpdateContact(contact: Contact) {
    if (contact.id) {
      const index = this.contactList.findIndex((c) => c.id === contact.id);
      this.contactList[index] = contact;
    } else {
      contact.id = this.contactList.length + 1;
      this.contactList.push(contact);
    }

    localStorage.setItem('contacts', JSON.stringify(this.contactList));
    this.isFormVisible = false;
  }

  public deleteContact(contact: Contact) {
    const confirmDeletion = confirm(
      `Are you sure you want to delete ${contact.name}`
    );
    if (confirmDeletion) {
      this.contactList = this.contactList.filter((c) => c.id !== contact.id);
      localStorage.setItem('contacts', JSON.stringify(this.contactList));
    }
  }

  public editContact(contact: Contact) {
    this.contactToEdit = contact;
    this.isFormVisible = true;
  }

  public loadContacts() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.contactList = JSON.parse(savedContacts);
      this.contactList.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  public toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }
}
