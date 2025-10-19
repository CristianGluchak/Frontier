import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css'],
})
export class DetalhesComponent implements OnInit {
  funcionarioForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const funcionario = {
      id: 1,
      nome: '1Cristian',
      cpf: '99999999999',
      cargo: 'motorista',
      horasSemanais: '40',
      salario: '1500',
      isEnable: 'sim(1)/nao(0)',
    };

    this.funcionarioForm = this.formBuilder.group({
      nome: [funcionario.nome, [Validators.required, Validators.minLength(4)]],
      cpf: [funcionario.cpf, [Validators.required]],
      cargo: [
        funcionario.cargo,
        [Validators.required, Validators.minLength(6)],
      ],
      horasSemanais: [
        funcionario.horasSemanais,
        [Validators.required, Validators.min(0)],
      ],
      salario: [
        funcionario.salario,
        [
          Validators.required,
          Validators.pattern(/^\d*\.?\d*$/),
          Validators.min(0),
        ],
      ],
      isEnable: [funcionario.isEnable === 'sim(1)/nao(0)' ? true : false],
    });
  }
}
