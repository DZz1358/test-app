import { PeopleService } from './../../services/people.service';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitter } from 'stream';


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {


  people = this.peopleService.getPeople();

  addUserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    id: new FormControl(),
    date: new FormControl(new Date()),
  });

  constructor(
    private peopleService: PeopleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  onSubmit() {
    this.peopleService.addUser(this.addUserForm.value).subscribe(
      (data: any) => {
        this.router.navigate(['/list']);

      },
      (error: any) => console.log(error, 'err')
    );
  }

  editMember(id: any) {
    this.peopleService.getIdUser(id).subscribe((data) => {
      this.addUserForm.patchValue(data);
    })
  }
}


