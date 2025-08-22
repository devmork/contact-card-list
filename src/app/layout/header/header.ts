import { Component } from '@angular/core';
import { ContactForm } from '../../shared/components/contact-form/contact-form';

@Component({
  selector: 'app-header',
  imports: [ContactForm],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  closeContactModal() {
    const modal = document.getElementById(
      'contact_form_modal'
    ) as HTMLDialogElement;
    modal?.close();
  }
}
