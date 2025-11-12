import {
  Component,
  OnInit,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community';
import { Payroll } from './payroll.model';
import { PayrollService } from '../services/payroll.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calcula-folha',
  templateUrl: './calcula-folha.component.html',
  styleUrls: ['./calcula-folha.component.css'],
})
export class CalculaFolhaComponent implements OnInit {
  columnDefs: ColDef[] = [
    { headerName: 'Funcionário', field: 'employeeName', flex: 1 },
    { headerName: 'Referência', field: 'referenceMonth', width: 130 },
    {
      headerName: 'Salário Base',
      field: 'baseSalary',
      width: 150,
      valueFormatter: (p) =>
        `R$ ${Number(p.value).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}`,
    },
    {
      headerName: 'Líquido',
      field: 'netTotal',
      width: 150,
      cellStyle: { color: '#2e7d32', 'font-weight': 600 },
      valueFormatter: (p) =>
        `R$ ${Number(p.value).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}`,
    },
    {
      headerName: 'Descontos',
      field: 'totalDeductions',
      width: 150,
      cellStyle: { color: '#c62828', 'font-weight': 600 },
      valueFormatter: (p) =>
        `R$ ${Number(p.value).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}`,
    },
  ];

  gridApi!: GridApi;
  selectedPayroll: Payroll | null = null;
  pageSize = 15;
  currentMonth = '';
  gridHeight = 0;
  totalElements = 0;
  loading = false;

  constructor(
    private service: PayrollService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.adjustGridHeight();
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustGridHeight();
  }

  adjustGridHeight(): void {
    const viewportHeight = window.innerHeight;
    // 🔹 altura total menos header e painel de detalhes
    this.gridHeight = viewportHeight - 230;
  }

  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.gridApi.setDatasource(this.createDataSource());
  }

  /** 🔹 Cria o datasource para paginação real (server-side) */
  private createDataSource(): IDatasource {
    return {
      getRows: (params: IGetRowsParams) => {
        const size = params.endRow - params.startRow;
        const page = params.startRow / size;

        this.service.getPayrolls(page, size, this.currentMonth).subscribe({
          next: (res) => {
            this.totalElements = res.totalElements ?? 0;
            params.successCallback(res.content ?? [], this.totalElements);
          },
          error: (err) => {
            console.error('Erro ao carregar folhas:', err);
            params.failCallback();
          },
        });
      },
    };
  }

  onSearch(month: string): void {
    this.currentMonth = month?.trim() || '';
    if (this.gridApi) {
      this.gridApi.purgeInfiniteCache(); // 🔄 recarrega do backend
      this.gridApi.paginationGoToFirstPage();
    }
  }

  onRowClicked(event: any): void {
    const id = event.data.id;

    // 🔸 fecha se clicar no mesmo
    if (this.selectedPayroll?.id === id) {
      this.selectedPayroll = null;
      this.cdr.detectChanges();
      return;
    }

    this.service.getPayrollById(id).subscribe({
      next: (res) => {
        this.selectedPayroll = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao buscar folha:', err),
    });
  }

  recalculatePayroll(employeeID: string, id: string): void {
    this.loading = true;

    this.service.recalculateSingle(employeeID).subscribe({
      next: () => {
        // recarrega o detalhe da folha atual
        this.service.getPayrollById(id).subscribe({
          next: (res) => {
            this.selectedPayroll = res;
            this.showSnackbar('✅ Folha recalculada com sucesso!');
            this.gridApi.refreshInfiniteCache(); // recarrega grid
          },
          error: () =>
            this.showSnackbar(
              '⚠️ Folha recalculada, mas houve erro ao atualizar o detalhe.'
            ),
          complete: () => (this.loading = false),
        });
      },
      error: (err) => {
        console.error('Erro ao recalcular folha:', err);
        this.showSnackbar('❌ Erro ao recalcular folha.');
        this.loading = false;
      },
    });
  }

  calculateAll(): void {
    this.loading = true;
    this.service.calculateAll().subscribe({
      next: () => {
        this.showSnackbar('✅ Todas as folhas recalculadas!');
        this.gridApi.refreshInfiniteCache();
      },
      error: (err) => {
        console.error('Erro ao recalcular todas:', err);
        this.showSnackbar('❌ Erro ao recalcular todas as folhas.', 'error');
      },
      complete: () => (this.loading = false),
    });
  }

  private showSnackbar(
    message: string,
    type: 'success' | 'error' = 'success'
  ): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }
}
