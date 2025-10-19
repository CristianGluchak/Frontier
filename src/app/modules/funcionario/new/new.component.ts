import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidarCpfService } from '../../services/validar-cpf.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  funcionarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validaCpf: ValidarCpfService
  ) {}

  ngOnInit(): void {
    this.funcionarioForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(4)]],
      cpf: ['', [Validators.required]],
      cargo: ['', [Validators.required, Validators.minLength(6)]],
      horasSemanais: ['', [Validators.required, Validators.min(0)]],
      salario: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d*\.?\d*$/),
          Validators.min(0),
        ],
      ],
      isEnable: [true],
    });
  }

  //TODO: IMPLEMENTAR CORRETAMENTE ESSA VALIDACAO
  validarCPF(control: AbstractControl): { [key: string]: boolean } | null {
    const cpf = control.value;
    if (!this.validaCpf.validandoCPF(cpf)) {
      return { cpfInvalido: true };
    }
    return null;
  }

  save() {}
  cancel() {}
}
