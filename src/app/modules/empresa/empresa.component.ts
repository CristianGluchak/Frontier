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

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  empresaForm!: FormGroup;
  gridApi!: GridApi;

  displayedColumns = ['name', 'status', 'actions'];

  pageSize = 15;
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
    {
      headerName: 'Ações',
      width: 130,
      cellRenderer: () => `
        <button class="grid-btn edit-btn">✏️</button>
        <button class="grid-btn delete-btn">🗑️</button>
      `,
      onCellClicked: (event) => {
        const target = event?.event?.target as HTMLElement | null;
        if (target && target.classList.contains('edit-btn')) {
          this.editUsuario(event.data);
        } else if (target && target.classList.contains('delete-btn')) {
          this.removeUsuario(event.data.id);
        }
      },
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

        this.userService
          .listUsuarios(page, this.pageSize, this.filterName)
          .subscribe({
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
    this.snack.open(`Editar usuário: ${usuario.name}`, '', { duration: 2000 });
  }

  removeUsuario(id: string) {
    this.snack.open(`Usuário removido.`, '', { duration: 2000 });
  }

  addUsuario() {
    this.snack.open('Adicionar novo usuário...', '', { duration: 2000 });
  }
}
