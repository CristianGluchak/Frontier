import { Component, HostListener, OnInit } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community';
import { Payroll } from '../calcula-folha/payroll.model';
import { PayrollService } from '../services/payroll.service';

@Component({
  selector: 'app-historico-folha',
  templateUrl: './historico-folha.component.html',
  styleUrls: ['./historico-folha.component.css'],
})
export class HistoricoFolhaComponent implements OnInit {
  /** 🔹 Colunas principais */
  columnDefs: ColDef[] = [
    { headerName: 'Funcionário', field: 'employeeName', flex: 1 },
    { headerName: 'Referência', field: 'referenceMonth', width: 130 },
    {
      headerName: 'Salário Base',
      field: 'baseSalary',
      width: 150,
      valueFormatter: (p) =>
        p.value
          ? `R$ ${Number(p.value).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}`
          : '',
    },
    {
      headerName: 'Bruto',
      field: 'grossTotal',
      width: 150,
      valueFormatter: (p) =>
        p.value
          ? `R$ ${Number(p.value).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}`
          : '',
    },
    {
      headerName: 'Descontos',
      field: 'totalDeductions',
      width: 150,
      cellStyle: { color: '#c62828', 'font-weight': 600 },
      valueFormatter: (p) =>
        p.value
          ? `R$ ${Number(p.value).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}`
          : '',
    },
    {
      headerName: 'Líquido',
      field: 'netTotal',
      width: 150,
      cellStyle: { color: '#2e7d32', 'font-weight': 600 },
      valueFormatter: (p) =>
        p.value
          ? `R$ ${Number(p.value).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}`
          : '',
    },
  ];

  gridApi!: GridApi;
  pageSize = 17;
  totalElements = 0;
  gridHeight = 0;
  currentMonth = '';
  loading = false;

  constructor(private service: PayrollService) {}

  ngOnInit(): void {
    this.adjustGridHeight();
  }

  /** 🔹 Ajusta altura responsiva */
  @HostListener('window:resize')
  onResize() {
    this.adjustGridHeight();
  }

  adjustGridHeight(): void {
    const viewportHeight = window.innerHeight;
    this.gridHeight = viewportHeight - 180;
  }

  /** 🔹 Inicializa o grid com datasource */
  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.gridApi.setDatasource(this.createDataSource());
  }

  /** 🔹 Cria o datasource paginado com filtro opcional */
  private createDataSource(): IDatasource {
    return {
      getRows: (params: IGetRowsParams) => {
        const size = params.endRow - params.startRow;
        const page = params.startRow / size;

        this.loading = true;
        this.service.getPayrolls(page, size, this.currentMonth).subscribe({
          next: (res) => {
            this.totalElements = res.totalElements ?? 0;
            params.successCallback(res.content ?? [], this.totalElements);
          },
          error: (err) => {
            console.error('Erro ao carregar histórico:', err);
            params.failCallback();
          },
          complete: () => (this.loading = false),
        });
      },
    };
  }

  /** 🔹 Filtro por mês (yyyy-MM) */
  onSearch(month: string): void {
    this.currentMonth = month?.trim() || '';
    if (this.gridApi) {
      this.gridApi.purgeInfiniteCache();
      this.gridApi.paginationGoToFirstPage();
    }
  }
}
