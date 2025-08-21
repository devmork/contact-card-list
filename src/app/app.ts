import { Component, signal, input, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Header } from './layout/header/header';
import { ContactCard } from './shared/components/contact-card/contact-card';
@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule, Header, ContactCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('contact-card-list');
}
