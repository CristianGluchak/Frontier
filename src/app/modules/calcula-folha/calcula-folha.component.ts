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
  currentSystemMonth = this.getCurrentYearMonth();
  gridHeight = 0;
  totalElements = 0;
  loading = false;

  constructor(
    private service: PayrollService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  private getCurrentYearMonth(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  ngOnInit(): void {
    this.adjustGridHeight();
    this.currentMonth = this.currentSystemMonth;
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustGridHeight();
  }

  adjustGridHeight(): void {
    const viewportHeight = window.innerHeight;
    this.gridHeight = viewportHeight - 230;
  }

  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.gridApi.setDatasource(this.createDataSource());
  }

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
          error: () => params.failCallback(),
        });
      },
    };
  }

  onSearch(month: string): void {
    this.currentMonth = month?.trim() || this.currentSystemMonth;

    if (this.gridApi) {
      this.gridApi.purgeInfiniteCache();
      this.gridApi.paginationGoToFirstPage();
    }
  }

  onRowClicked(event: any): void {
    const id = event.data.id;

    if (this.selectedPayroll?.id === id) {
      this.selectedPayroll = null;
      return;
    }

    this.service.getPayrollById(id).subscribe({
      next: (res) => {
        this.selectedPayroll = res;
        this.cdr.detectChanges();
      },
    });
  }

  recalculatePayroll(employeeID: string, id: string): void {
    if (!this.canRecalculateSelected()) {
      this.showSnackbar(
        'Ainda não é possível recalcular folhas retroativas.',
        'info'
      );
      return;
    }

    this.loading = true;
    this.service.recalculateSingle(employeeID).subscribe({
      next: () => {
        this.service.getPayrollById(id).subscribe({
          next: (res) => {
            this.selectedPayroll = res;
            this.showSnackbar('Folha recalculada com sucesso!', 'success');
            this.gridApi.refreshInfiniteCache();
          },
          error: () => this.showSnackbar('Erro ao atualizar folha.', 'error'),
          complete: () => (this.loading = false),
        });
      },
      error: () => {
        this.showSnackbar('❌ Erro ao recalcular folha.', 'error');
        this.loading = false;
      },
    });
  }

  calculateAll(): void {
    if (!this.isCurrentMonth()) {
      this.showSnackbar(
        'Ainda não é possível calcular folhas retroativas.',
        'info'
      );
      return;
    }

    this.loading = true;
    this.service.calculateAll().subscribe({
      next: () => {
        this.showSnackbar(
          'Todas as folhas recalculadas com sucesso!',
          'success'
        );
        this.gridApi.refreshInfiniteCache();
      },
      error: () => {
        this.showSnackbar('❌ Erro ao recalcular todas as folhas.', 'error');
      },
      complete: () => (this.loading = false),
    });
  }

  private showSnackbar(
    message: string,
    type: 'info' | 'error' | 'success' = 'info'
  ): void {
    this.snackBar.open(message, 'Fechar', {
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

  isCurrentMonth(): boolean {
    return this.currentMonth === this.currentSystemMonth;
  }

  canRecalculateSelected(): boolean {
    return this.selectedPayroll?.referenceMonth === this.currentSystemMonth;
  }
}
