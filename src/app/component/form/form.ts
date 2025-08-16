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

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  public onSubmit() {
    if (this.contactForm.valid) {
      this.contact.emit(this.contactForm.value);
      this.contactForm.reset();
    }
  }

  public onCancel() {
    this.cancel.emit();
  }
}
