import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
export class SearchBarComponent implements OnInit, OnChanges {
  @Input() fields: SearchField[] = [];

  @Input() initialValues: { [key: string]: string } | null = null;

  @Output() search = new EventEmitter<{ [key: string]: string }>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.applyInitialValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValues'] && this.form) {
      this.applyInitialValues();
    }
  }

  private buildForm() {
    const controls: any = {};
    this.fields.forEach((f) => (controls[f.key] = ['']));
    this.form = this.fb.group(controls);
  }

  private applyInitialValues() {
    if (this.initialValues) {
      this.form.patchValue(this.initialValues, { emitEvent: false });
      this.onSearch();
    }
  }

  onSearch() {
    const values = this.form.value;

    const filtered = Object.entries(values)
      .filter((entry): entry is [string, string] => {
        return (
          typeof entry[1] === 'string' && (entry[1] as string).trim() !== ''
        );
      })
      .reduce(
        (acc, [k, v]) => ({ ...acc, [k]: v.trim() }),
        {} as { [key: string]: string }
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
