import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalhes-funcionario',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css'],
})
export class DetalhesComponent implements OnInit {
  funcionarioForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // 🔹 JSON Fonte
    const funcionario = {
      name: 'John Doe',
      cpf: '123.456.789-00',
      position: 'Analista de Sistemas',
      hours: '40',
      salary: 2000,
      status: 'ATIVO',
      inactivation_date: '2024-12-31',
      birth_date: '1995-07-12',
      gender: 'MASCULINO',
      civil_status: 'SOLTEIRO',
      nationality: 'BRASILEIRA',
      email: 'john.doe@email.com',
      phone: '(11) 98765-4321',
      address: {
        street: 'Rua das Flores',
        number: '123',
        district: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        cep: '01000-000',
      },
    };

    // 🔹 Formulário reestruturado
    this.funcionarioForm = this.fb.group({
      name: [funcionario.name, [Validators.required, Validators.minLength(4)]],
      cpf: [funcionario.cpf, [Validators.required]],
      position: [
        funcionario.position,
        [Validators.required, Validators.minLength(3)],
      ],
      hours: [funcionario.hours, [Validators.required, Validators.min(1)]],
      salary: [funcionario.salary, [Validators.required, Validators.min(1)]],
      status: [funcionario.status, [Validators.required]],
      inactivation_date: [funcionario.inactivation_date],
      birth_date: [funcionario.birth_date],
      gender: [funcionario.gender],
      civil_status: [funcionario.civil_status],
      nationality: [funcionario.nationality],
      email: [funcionario.email, [Validators.required, Validators.email]],
      phone: [funcionario.phone, [Validators.required]],
      address: this.fb.group({
        street: [funcionario.address.street],
        number: [funcionario.address.number],
        district: [funcionario.address.district],
        city: [funcionario.address.city],
        state: [funcionario.address.state],
        cep: [funcionario.address.cep],
      }),
    });
  }

  onSubmit(): void {
    if (this.funcionarioForm.valid) {
      console.log('✅ Funcionário salvo:', this.funcionarioForm.value);
    } else {
      console.warn('❌ Formulário inválido');
    }
  }
}
