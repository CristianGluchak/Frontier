import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpresaService, Empresa } from '../services/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  empresaForm!: FormGroup;
  usuarios = new MatTableDataSource<any>([]);
  displayedColumns = ['nome', 'email', 'acoes'];
  employerId =
    localStorage.getItem('employerId') == null
      ? ''
      : localStorage.getItem('employerId')!;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
    this.empresaForm = this.fb.group({
      razaoSocial: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.loadEmpresa();
  }

  /** 🔹 Carrega dados da empresa do endpoint */
  loadEmpresa(): void {
    this.empresaService.getEmpresa(this.employerId).subscribe({
      next: (empresa: Empresa) => {
        this.empresaForm.patchValue(empresa);
      },
      error: (err) => {
        console.error('Erro ao buscar empresa:', err);
        this.snackBar.open('Erro ao carregar dados da empresa.', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  /** 🔹 Atualiza os dados da empresa */
  send(): void {
    if (this.empresaForm.valid) {
      const empresa: Empresa = this.empresaForm.value;
      this.empresaService.updateEmpresa(this.employerId, empresa).subscribe({
        next: () => {
          this.snackBar.open('Empresa salva com sucesso!', 'OK', {
            duration: 2000,
            panelClass: ['success-snackbar'],
          });
        },
        error: (err) => {
          console.error('Erro ao salvar empresa:', err);
          this.snackBar.open('Erro ao salvar empresa.', 'Fechar', {
            duration: 2000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    } else {
      this.empresaForm.markAllAsTouched();
      this.snackBar.open('Preencha os campos obrigatórios.', 'Fechar', {
        duration: 2000,
        panelClass: ['error-snackbar'],
      });
    }
  }

  /** ✅ Mock de adição de usuário */
  addUsuario(): void {
    const novo = {
      id: Date.now(),
      nome: 'Novo Usuário ' + (this.usuarios.data.length + 1),
      email: 'novo' + (this.usuarios.data.length + 1) + '@mail.com',
    };
    this.usuarios.data = [...this.usuarios.data, novo];
    this.snackBar.open('Usuário adicionado!', '', { duration: 1500 });
  }

  /** ✅ Mock de edição */
  editUsuario(usuario: any): void {
    const nomeAntigo = usuario.nome;
    usuario.nome = usuario.nome + ' (Editado)';
    this.usuarios.data = [...this.usuarios.data];
    this.snackBar.open(`Usuário "${nomeAntigo}" editado!`, '', {
      duration: 1500,
    });
  }

  /** ✅ Mock de exclusão */
  removeUsuario(id: number): void {
    this.usuarios.data = this.usuarios.data.filter((u) => u.id !== id);
    this.snackBar.open('Usuário removido.', '', { duration: 1500 });
  }
}
