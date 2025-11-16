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
import { EmpresaService } from '../services/empresa.service';
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
    password: ['', [Validators.required, Validators.minLength(6)]],
    status: ['ATIVO', Validators.required],
  });

  pageSize = 5;
  filterName = '';

  columnDefs: ColDef[] = [
    { headerName: 'Nome', field: 'name', flex: 1 },
    {
      headerName: 'Status',
      field: 'status',
      width: 150,
      cellRenderer: (p: any) =>
        `<span class="status ${p.value === 'ATIVO' ? 'ativo' : 'inativo'}">${
          p.value
        }</span>`,
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
      cnpj: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.loadEmpresa();
  }

  loadEmpresa() {
    const employerId = localStorage.getItem('employerId') ?? '';

    this.empresaService.getEmpresa(employerId).subscribe({
      next: (empresa) => this.empresaForm.patchValue(empresa),
      error: () => this.showSnackbar('Erro ao carregar empresa', 'error'),
    });
  }

  send() {
    if (this.empresaForm.invalid) {
      this.showSnackbar('Preencha os campos obrigatórios.', 'info');
      return;
    }

    const employerId = localStorage.getItem('employerId') ?? '';
    this.empresaService
      .updateEmpresa(employerId, this.empresaForm.value)
      .subscribe({
        next: () =>
          this.showSnackbar('Empresa editada com sucesso!', 'success'),
      });
  }

  onGridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
    this.gridApi.setDatasource(this.createDatasource());
  }

  createDatasource(): IDatasource {
    return {
      getRows: (params: IGetRowsParams) => {
        const page = params.startRow / this.pageSize;

        this.userService.list(page, this.pageSize, this.filterName).subscribe({
          next: (res) => params.successCallback(res.content, res.totalElements),
          error: () => params.failCallback(),
        });
      },
    };
  }

  onSearch(event: any) {
    this.filterName = event.name ?? '';
    this.gridApi.purgeInfiniteCache();
  }

  onRowClicked(event: any) {
    const id = event.data.id;

    this.userService.getByID(id).subscribe({
      next: (user) => {
        this.selectedUser = user;
        this.usuarioForm.patchValue({
          name: user.name,
          email: user.email,
          status: user.status,
          password: '',
        });

        this.usuarioForm.get('password')?.clearValidators();
        this.usuarioForm.get('password')?.updateValueAndValidity();
      },
      error: () => this.showSnackbar('Erro ao carregar usuário', 'error'),
    });
  }

  cancelEdit() {
    this.selectedUser = null;

    this.usuarioForm.reset({ status: 'ATIVO' });

    this.usuarioForm
      .get('password')
      ?.setValidators([Validators.required, Validators.minLength(6)]);

    this.usuarioForm.get('password')?.updateValueAndValidity();
  }

  saveUsuario() {
    if (this.usuarioForm.invalid) {
      this.showSnackbar('Preencha os campos corretamente.', 'info');
      return;
    }

    if (this.selectedUser) {
      const body: UserUpdate = {
        name: this.usuarioForm.value.name!,
        email: this.usuarioForm.value.email!,
        password: this.usuarioForm.value.password!,
        status: this.usuarioForm.value.status!,
      };

      this.userService.update(this.selectedUser.id, body).subscribe(() => {
        this.showSnackbar('Usuário atualizado!', 'success');
        this.gridApi.refreshInfiniteCache();
        this.cancelEdit();
      });
    } else {
      const body: UserCreate = {
        name: this.usuarioForm.value.name!,
        email: this.usuarioForm.value.email!,
        password: this.usuarioForm.value.password!,
      };

      this.userService.create(body).subscribe(() => {
        this.showSnackbar('Usuário criado!', 'success');
        this.gridApi.refreshInfiniteCache();
        this.cancelEdit();
      });
    }
  }

  private showSnackbar(
    message: string,
    type: 'info' | 'error' | 'success' = 'info'
  ): void {
    this.snack.open(message, 'Fechar', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass:
        type === 'error'
          ? 'snackbar-error'
          : type === 'success'
          ? 'snackbar-success'
          : 'snackbar-info',
    });
  }
}
