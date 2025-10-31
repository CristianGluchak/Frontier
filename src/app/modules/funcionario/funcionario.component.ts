import { Component, OnInit } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

interface Employee {
  id: string;
  name: string;
  cpf: string;
  position: string;
  hours: string;
  salary: number;
  status: string;
  inactivationDate?: string;
  employerFantasyName?: string;
}

interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css'],
})
export class FuncionarioComponent implements OnInit {
  /** 🔹 Colunas da tabela */
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

  /** 🔹 Estado interno */
  private gridApi!: GridApi;
  private currentSearch = '';
  totalElements = 0;
  pageSize = 17;
  loading = false;

  /** 🔹 URL base da API */
  private readonly apiUrl = 'http://localhost:8080/employee';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // nada aqui — o grid inicializa o datasource automaticamente
  }

  /** 🔹 Quando o grid estiver pronto */
  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.gridApi.setDatasource(this.createDataSource());
  }

  /** 🔹 Cria o datasource do modelo Infinite */
  private createDataSource(): IDatasource {
    return {
      getRows: (params: IGetRowsParams) => {
        const size = params.endRow - params.startRow;
        const page = Math.floor(params.startRow / size);

        let httpParams = new HttpParams()
          .set('page', page.toString())
          .set('size', size.toString());

        if (this.currentSearch) {
          httpParams = httpParams.set('name', this.currentSearch);
        }

        this.loading = true;

        this.http
          .get<PagedResponse<Employee>>(this.apiUrl, { params: httpParams })
          .subscribe({
            next: (res) => {
              const rows = res.content ?? [];
              this.totalElements = res.totalElements ?? 0;

              // ✅ informa ao AG Grid quantas linhas existem no total
              params.successCallback(rows, this.totalElements);
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

  /** 🔹 Filtro simples (search bar) */
  onSearch(name: string): void {
    this.currentSearch = (name || '').trim();

    // Limpa o cache e recarrega desde a primeira página
    if (this.gridApi) {
      this.gridApi.purgeInfiniteCache();
      this.gridApi.paginationGoToFirstPage();
    }
  }

  /** 🔹 Clique na linha */
  onRowClicked(event: any): void {
    console.log('Linha clicada:', event.data);
  }

  /** 🔹 Navega para o detalhe */
  goToDetalhes(id: string): void {
    this.router.navigate(['/funcionario', id]);
  }

  /** 🔹 Novo funcionário */
  goToNew(): void {
    this.router.navigate(['/funcionario/novo']);
  }
}
