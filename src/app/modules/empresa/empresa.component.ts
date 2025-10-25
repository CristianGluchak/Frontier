import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  empresaForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.empresaForm = this.fb.group({
      razaoSocial: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      cnpj: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', Validators.required],
      pais: ['', Validators.required],
      uf: ['', [Validators.required, Validators.maxLength(2)]],
      cidade: ['', Validators.required],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
    });
  }

  send(): void {
    if (this.empresaForm.valid) {
      const payload = this.empresaForm.value;
      console.log('Request:', payload);
      // Aqui você pode chamar o service de cadastro da empresa
    } else {
      this.empresaForm.markAllAsTouched();
    }
  }
}
