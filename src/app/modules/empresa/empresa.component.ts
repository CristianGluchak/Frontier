import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  GridApi,
  GridReadyEvent,
  ColDef,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community';
import { EmpresaService, Empresa } from '../services/empresa.service';
import { UserService } from '../services/user.service';
import { UserCreate, UserUpdate } from './user.model';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  empresaForm!: FormGroup;
  gridApi!: GridApi;

  selectedUser: any = null;

  usuarioForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    status: ['ATIVO', Validators.required],
  });

  displayedColumns = ['name', 'status', 'actions'];

  pageSize = 5;
  totalElements = 0;
  filterName = '';

  /** Colunas do AG-Grid */
  columnDefs: ColDef[] = [
    {
      headerName: 'Nome',
      field: 'name',
      flex: 1,
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 150,
      cellRenderer: (p: any) =>
        `<span class="status ${p.value === 'ATIVO' ? 'ativo' : 'inativo'}">
          ${p.value}
        </span>`,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private empresaService: EmpresaService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.empresaForm = this.fb.group({
      razaoSocial: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      cnpj: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.loadEmpresa();
  }

  /** ---- CARREGA EMPRESA ---- */
  loadEmpresa() {
    const employerId = localStorage.getItem('employerId') ?? '';

    this.empresaService.getEmpresa(employerId).subscribe({
      next: (empresa) => this.empresaForm.patchValue(empresa),
      error: () =>
        this.snack.open('Erro ao carregar empresa', 'Fechar', {
          duration: 2000,
          panelClass: ['error-snackbar'],
        }),
    });
  }

  /** ---- SALVA ---- */
  send() {
    if (!this.empresaForm.valid) {
      this.snack.open('Preencha os campos obrigatórios.', '', {
        duration: 2000,
        panelClass: ['error-snackbar'],
      });
      return;
    }

    const employerId = localStorage.getItem('employerId') ?? '';
    this.empresaService
      .updateEmpresa(employerId, this.empresaForm.value)
      .subscribe({
        next: () =>
          this.snack.open('Empresa editada com sucesso!', '', {
            duration: 2000,
            panelClass: ['successe-snackbar'],
          }),
      });
  }

  /** ---- GRID READY ---- */
  onGridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
    this.gridApi.setDatasource(this.createDatasource());
  }

  /** ---- SERVER SIDE DATASOURCE ---- */
  createDatasource(): IDatasource {
    return {
      getRows: (params: IGetRowsParams) => {
        const page = params.startRow / this.pageSize;

        this.userService.list(page, this.pageSize, this.filterName).subscribe({
          next: (res: any) => {
            params.successCallback(res.content, res.totalElements);
          },
          error: () => params.failCallback(),
        });
      },
    };
  }

  /** ---- FILTRO ---- */
  onSearch(event: any) {
    this.filterName = event.name ?? '';
    this.gridApi!.purgeInfiniteCache();
  }

  /** ---- AÇÕES ---- */
  editUsuario(usuario: any) {
    this.selectedUser = usuario;
    this.usuarioForm.patchValue({
      name: usuario.name,
      email: usuario.email,
      status: usuario.status,
      password: '', // sempre vazio ao editar
    });

    // 👉 Remove obrigatoriedade da senha ao editar
    this.usuarioForm.get('password')?.clearValidators();
    this.usuarioForm.get('password')?.updateValueAndValidity();
  }

  cancelEdit() {
    this.selectedUser = null;
    this.usuarioForm.reset({ status: 'ATIVO' });

    // 👉 Agora senha é obrigatória novamente
    this.usuarioForm
      .get('password')
      ?.setValidators([Validators.required, Validators.minLength(6)]);

    this.usuarioForm.get('password')?.updateValueAndValidity();
  }

  saveUsuario() {
    if (this.usuarioForm.invalid) {
      this.snack.open('Preencha todos os campos corretamente', 'Fechar', {
        duration: 2000,
      });
      return;
    }

    if (this.selectedUser) {
      const body: UserUpdate = {
        name: this.usuarioForm.value.name!,
        email: this.usuarioForm.value.email!,
        password: this.usuarioForm.value.password!,
        status: this.usuarioForm.value.status!,
      };
      // Atualizar
      this.userService.update(this.selectedUser.id, body).subscribe(() => {
        this.snack.open('Usuário atualizado!', '', { duration: 1500 });
        this.gridApi.refreshInfiniteCache();
        this.cancelEdit();
      });
    } else {
      const body: UserCreate = {
        name: this.usuarioForm.value.name!,
        password: this.usuarioForm.value.password!,
        email: this.usuarioForm.value.email!,
      };
      // Criar
      this.userService.create(body).subscribe(() => {
        this.snack.open('Usuário criado!', '', { duration: 1500 });
        this.gridApi.refreshInfiniteCache();
        this.cancelEdit();
      });
    }
  }

  onRowClicked(event: any) {
    const userId = event.data.id;

    this.userService.getByID(userId).subscribe({
      next: (user) => {
        this.selectedUser = user;
        this.usuarioForm.patchValue(user);
      },
      error: () => {
        this.snack.open('Erro ao carregar dados do usuário', 'Fechar', {
          duration: 2000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
