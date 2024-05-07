import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  funcionarioForm !: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.funcionarioForm = this.formBuilder.group({
      nome: [''],
      cpf: [''],
      cargo: [''],
      horasSemanais: [''],
      salario: [''],
      isEnable: [true]
    });
  }
}
