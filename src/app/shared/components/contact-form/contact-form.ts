import { Component, inject, input, output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../../models/interface/contact.interface';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  contactService = inject(ContactService);
  contactForm: FormGroup;
  contactToUpdate = input<Contact>();
  closeModal = output<void>();

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    const contact = this.contactToUpdate();
    if (contact) {
      this.contactForm.patchValue({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      });
    }
  }
  public submitContact() {
    if (this.contactForm.valid) {
      const contactData: Contact = this.contactForm.getRawValue();
      const contact = this.contactToUpdate();
      if (contact) {
        contactData.id = contact.id;
        this.contactService.updateContact(contactData);
      } else {
        this.contactService.addContact(contactData);
      }
      this.contactForm.reset();
      this.closeModal.emit();
    } else {
      alert('Please fill in all fields before submitting.');
    }
  }

  public cancel() {
    this.closeModal.emit();
    this.contactForm.reset();
  }
}
