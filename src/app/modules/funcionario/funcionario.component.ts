import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css'],
})
export class FuncionarioComponent implements OnInit {
  columnDefs: ColDef[] = [
    {
      headerName: 'Nome',
      field: 'nome',
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: 'CPF',
      field: 'cpf',
      sortable: true,
      filter: true,
      width: 160,
    },
    {
      headerName: 'Cargo',
      field: 'cargo',
      sortable: true,
      filter: true,
      flex: 1,
    },
    { headerName: 'Horas Semanais', field: 'horasSemanais', width: 140 },
    {
      headerName: 'Salário',
      field: 'salario',
      valueFormatter: (params) =>
        `R$ ${params.value.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}`,
      width: 140,
    },
    {
      headerName: 'Status',
      field: 'isEnable',
      width: 120,
      cellRenderer: (params: any) =>
        `<span style="font-weight:600; color: ${
          params.value ? '#2e7d32' : '#c62828'
        }">${params.value ? 'Ativo' : 'Inativo'}</span>`,
    },
    {
      headerName: '',
      field: 'acoes',
      width: 80,
      cellRenderer: () =>
        `<button class="btn-edit" title="Editar">
           <span class="material-symbols-outlined">edit</span>
         </button>`,
      onCellClicked: (event) => this.goToDetalhes(event.data.id),
    },
  ];

  rowData = [
    {
      id: 1,
      nome: 'Ana Souza',
      cpf: '123.456.789-00',
      cargo: 'Gerente',
      horasSemanais: 44,
      salario: 7500,
      isEnable: true,
    },
    {
      id: 2,
      nome: 'Carlos Pereira',
      cpf: '987.654.321-00',
      cargo: 'Analista',
      horasSemanais: 40,
      salario: 4500,
      isEnable: true,
    },
    {
      id: 3,
      nome: 'Mariana Lima',
      cpf: '456.789.123-00',
      cargo: 'Desenvolvedor',
      horasSemanais: 40,
      salario: 6000,
      isEnable: false,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  onRowClicked(event: any) {
    console.log('Linha clicada:', event.data);
  }

  goToDetalhes(id: number) {
    this.router.navigate(['/funcionario', id]);
  }

  goToNew() {
    this.router.navigate(['/funcionario/novo']);
  }
}
