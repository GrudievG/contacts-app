import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent{
  @Output() query = new EventEmitter();

  search(value) {
    this.query.emit(value);
  }
}
