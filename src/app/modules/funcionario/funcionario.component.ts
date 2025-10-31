import { Component, OnInit } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community';
import { Router } from '@angular/router';
import { Employee } from './employee.model';
import { FuncionarioService } from '../services/employee.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css'],
})
export class FuncionarioComponent implements OnInit {
  columnDefs: ColDef[] = [
    { headerName: 'Nome', field: 'name', flex: 1 },
    {
      headerName: 'CPF',
      field: 'cpf',
      width: 150,
      valueFormatter: (params) =>
        params.value
          ? params.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
          : '',
    },
    { headerName: 'Cargo', field: 'position', flex: 1 },
    { headerName: 'Horas Semanais', field: 'hours', width: 150 },
    {
      headerName: 'Salário',
      field: 'salary',
      width: 150,
      valueFormatter: (params) =>
        params.value
          ? `R$ ${params.value.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}`
          : '',
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 120,
      cellRenderer: (params: any) => {
        const ativo = params.value === 'ATIVO';
        return `<span style="font-weight:600; color:${
          ativo ? '#2e7d32' : '#c62828'
        }">${ativo ? 'Ativo' : 'Inativo'}</span>`;
      },
    },
    {
      headerName: '',
      width: 80,
      cellRenderer: () =>
        `<button class="btn-edit" title="Editar">
           <span class="material-symbols-outlined">edit</span>
         </button>`,
      onCellClicked: (event) => this.goToDetalhes(event.data.id),
    },
  ];

  private gridApi!: GridApi;
  private currentSearch = '';
  totalElements = 0;
  pageSize = 17;
  loading = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /** 🔹 Quando o grid estiver pronto */
  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.gridApi.setDatasource(this.createDataSource());
  }

  /** 🔹 Cria o datasource para busca paginada e com filtro */
  private createDataSource(): IDatasource {
    return {
      getRows: (params: IGetRowsParams) => {
        const size = params.endRow - params.startRow;
        const page = Math.floor(params.startRow / size);

        this.loading = true;

        this.funcionarioService
          .getEmployees(page, size, this.currentSearch)
          .subscribe({
            next: (res) => {
              this.totalElements = res.totalElements ?? 0;
              params.successCallback(res.content ?? [], this.totalElements);
            },
            error: (err) => {
              console.error('Erro ao carregar funcionários:', err);
              params.failCallback();
            },
            complete: () => (this.loading = false),
          });
      },
    };
  }

  /** 🔹 Atualiza o filtro de nome e recarrega o grid */
  onSearch(name: string): void {
    this.currentSearch = name?.trim() || '';

    if (this.gridApi) {
      // 🔄 limpa o cache e força o grid a refazer a chamada ao backend
      this.gridApi.purgeInfiniteCache();
      this.gridApi.paginationGoToFirstPage();
    }
  }

  onRowClicked(event: any): void {
    console.log('Linha clicada:', event.data);
  }

  goToDetalhes(id: string): void {
    this.router.navigate(['/funcionario', id]);
  }

  goToNew(): void {
    this.router.navigate(['/funcionario/novo']);
  }
}
