import { Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../../models/interface/contact.interface';
import { ContactForm } from '../contact-form/contact-form';

@Component({
  selector: 'app-contact-card',
  imports: [ContactForm],
  templateUrl: './contact-card.html',
  styleUrl: './contact-card.css',
})
export class ContactCard {
  contactService = inject(ContactService);
  contacts: Contact[] = [];
  contactToUpdate!: Contact;
  showContactForm: boolean = false;

  ngOnInit() {
    this.loadContacts();
  }

  public loadContacts() {
    this.contactService.getAllContacts();
    this.contacts = this.contactService.contacts;
  }

  public deleteContact(contact: Contact) {
    if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
      this.contactService.deleteContact(contact);
      this.loadContacts();
    }
  }

  public updateContact(contact: Contact) {
    this.contactToUpdate = contact;
    this.showContactForm = true;
  }

  closeContactForm() {
    this.showContactForm = false;
  }
}
