import { Component, output, input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Contact } from '../../models/interface/contact.interface';

@Component({
  selector: 'app-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  contact = output<Contact>();
  cancel = output<void>();

  contactForm: FormGroup;

  ngOnInit() {
    const contactToEdit = this.edit();

    if (contactToEdit) {
      this.populateForm(contactToEdit);
    }
  }

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  public onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      const editedContact = this.edit();
      if (editedContact) {
        formData.id = editedContact.id;
      }

      this.newContact.emit(formData);
      this.contactForm.reset();
} else {
      alert('Please fill in all required fields correctly.');
    }
  }

  public populateForm(contact: Contact) {
    this.contactForm.patchValue({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  }
  public onCancel() {
    this.cancel.emit();
  }
}
