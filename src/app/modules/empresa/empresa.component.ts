import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  empresaForm!: FormGroup;
  usuarios = new MatTableDataSource<any>([]);
  displayedColumns = ['nome', 'email', 'acoes'];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Mock inicial da empresa
    this.empresaForm = this.fb.group({
      razaoSocial: ['Jhon’s Store LTDA', Validators.required],
      nomeFantasia: ['Loja do Jhon', Validators.required],
      cnpj: [
        '22829957000188',
        [Validators.required, Validators.pattern(/^\d{14}$/)],
      ],
      email: ['jhonstore@mail.com', [Validators.required, Validators.email]],
    });

    // Mock inicial dos usuários
    this.usuarios.data = [
      { id: 1, nome: 'João da Silva', email: 'joao@mail.com' },
      { id: 2, nome: 'Maria Oliveira', email: 'maria@mail.com' },
      { id: 3, nome: 'Carlos Souza', email: 'carlos@mail.com' },
    ];
  }

  /** ✅ Mock de envio da empresa */
  send(): void {
    if (this.empresaForm.valid) {
      console.log('Empresa enviada:', this.empresaForm.value);
      this.snackBar.open('Empresa salva com sucesso!', 'OK', {
        duration: 2000,
        panelClass: ['success-snackbar'],
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
