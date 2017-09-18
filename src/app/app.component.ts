import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data = { meta: { count: 0, revision: 0 }, list: [] };
  item = {};
  state = 'init';
  index = 0;

  constructor(private httpService: HttpService) {}

  readData() {
    this.httpService.getData().subscribe(res => {
      this.data = res.json();
      this.state = 'list';
    });
  }

  ngOnInit() {
    this.readData();
  }

  edit(item) {
    this.item = item;
    this.state = 'edit';
  }

  add() {
    this.item = {
      name: '',
      room: '',
      comment: '',
      refNr: ''
    };
    this.state = 'new';
  }

  back(event) {
    event.preventDefault();
    event.stopPropagation();
    this.state = 'list';
  }

  save(form: NgForm) {
    let item = form.value;
    if (item.refNr == '' || item.name == '') {
      alert('Ref number and name cannot be empty');
      return;
    }
    this.httpService.save(item).subscribe(() => this.readData());
  }

  delete(event, refNr) {
    event.stopPropagation();
    this.httpService.delete(refNr).subscribe(() => this.readData());
  }
}
