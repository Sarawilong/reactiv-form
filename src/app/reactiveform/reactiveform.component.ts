import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.scss']
})
export class ReactiveformComponent implements OnInit {
  ngOnInit(){
    console.log('quye')
  }
  
  // Adding variables
  itemName = '';
  itemLastName = '';
  itemEmail = '';
  itemSubject = '';
  itemMessage = '';
  items: Observable<any[]>;
  contactForm: FormGroup;

// Setting the database 
  constructor(private fb: FormBuilder, private db: AngularFireDatabase) {
    this.items = db.list('messages').valueChanges()

// Passing in MD_Bootstrap form validation 
    this.contactForm = fb.group({
    itemName: ['', Validators.required],
    itemLastName: ['', Validators.required],
    itemEmail: ['', [Validators.required, Validators.email]],
    itemSubject: ['', Validators.required],
    itemMessage: ['', Validators.required]
 });
   }
// Pushing the contact-form to the firebase data base
   onSubmit()  {
   this.db.list('/messages').push({ name: this.itemName, email: this.itemEmail, subject: this.itemSubject, 
   message: this.itemMessage});
   
//Popup message
   alert('Thank you for contacting us, your message has gone through!')
  }
  // Clearing the form after submit
  clearForm() {
    this.contactForm.reset();
  }
}
