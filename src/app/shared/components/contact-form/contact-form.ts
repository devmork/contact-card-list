import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  contactService = inject(ContactService);
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  saveContact() {
    if (this.contactForm.valid) {
      const contactData = this.contactForm.getRawValue();
      this.contactService.addContact(contactData);
    }
  }
}
