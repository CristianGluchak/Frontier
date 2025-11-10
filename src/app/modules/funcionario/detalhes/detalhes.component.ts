import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Employee } from '../employee.model';
import { FuncionarioService } from '../../services/employee.service';

@Component({
  selector: 'app-detalhes-funcionario',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css'],
})
export class DetalhesComponent implements OnInit {
  funcionarioForm!: FormGroup;
  isEditMode = false;
  employeeId?: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    this.createForm();

    // 🔹 Detecta modo edição ou criação
    this.employeeId = this.route.snapshot.paramMap.get('id') ?? undefined;
    this.isEditMode = !!this.employeeId;

    if (this.isEditMode && this.employeeId) {
      this.loadEmployee(this.employeeId);
    }
  }

  /** 🔹 Inicializa o formulário vazio */
  private createForm(): void {
    this.funcionarioForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      cpf: ['', [Validators.required]],
      position: ['', [Validators.required, Validators.minLength(3)]],
      hours: ['', [Validators.required, Validators.min(1)]],
      salary: ['', [Validators.required, Validators.min(1)]],
      status: ['ATIVO', Validators.required],
      inactivationDate: [''],
      birthDate: [''],
      gender: [''],
      civilState: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      nationality: [''],
      address: this.fb.group({
        street: [''],
        number: [''],
        district: [''],
        city: [''],
        state: [''],
        cep: [''],
      }),
    });
  }

  /** 🔹 Carrega os dados para edição */
  private loadEmployee(id: string): void {
    this.loading = true;
    this.funcionarioService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.funcionarioForm.patchValue(employee);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar funcionário:', err);
        this.loading = false;
      },
    });
  }

  /** 🔹 Cria ou atualiza o funcionário */
  onSubmit(): void {
    if (this.funcionarioForm.invalid) {
      this.funcionarioForm.markAllAsTouched();
      return;
    }

    const employeeData: Employee = this.funcionarioForm.value;
    this.loading = true;

    if (this.isEditMode && this.employeeId) {
      // ✏️ Atualiza funcionário
      this.funcionarioService
        .updateEmployee(this.employeeId, employeeData)
        .subscribe({
          next: () => {
            alert('Funcionário atualizado com sucesso!');
            this.router.navigate(['/funcionario']);
          },
          error: (err) => {
            console.error('Erro ao atualizar funcionário:', err);
            this.loading = false;
          },
        });
    } else {
      // 🆕 Cria novo funcionário
      this.funcionarioService.createEmployee(employeeData).subscribe({
        next: () => {
          alert('Funcionário criado com sucesso!');
          this.router.navigate(['/funcionario']);
        },
        error: (err) => {
          console.error('Erro ao criar funcionário:', err);
          this.loading = false;
        },
      });
    }
  }
}
