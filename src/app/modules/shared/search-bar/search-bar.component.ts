import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface SearchField {
  key: string;
  label: string;
  placeholder?: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Input() fields: SearchField[] = [
    { key: 'name', label: 'Nome', placeholder: 'Buscar por nome...' },
  ];

  @Output() search = new EventEmitter<{ [key: string]: string }>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const controls: any = {};
    this.fields.forEach((f) => (controls[f.key] = ['']));
    this.form = this.fb.group(controls);
  }

  onSearch() {
    const values = this.form.value;
    const filtered = Object.entries(values)
      .filter(([_, v]) => typeof v === 'string' && v.trim())
      .reduce(
        (acc, [k, v]) => ({
          ...acc,
          [k]: typeof v === 'string' ? v.trim() : v,
        }),
        {}
      );
    this.search.emit(filtered);
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  clear() {
    this.form.reset();
    this.onSearch();
  }
}
