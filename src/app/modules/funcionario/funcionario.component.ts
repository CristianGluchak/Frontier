import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FuncionarioComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'id',
    'nome',
    'cpf',
    'cargo',
    'horasSemanais',
    'salario',
    'isEnable',
    'acoes',
  ];

  funcionarios = [
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
    {
      id: 4,
      nome: 'Fernando Rocha',
      cpf: '321.654.987-00',
      cargo: 'Suporte',
      horasSemanais: 36,
      salario: 3200,
      isEnable: true,
    },
    {
      id: 5,
      nome: 'Patrícia Mendes',
      cpf: '159.753.486-00',
      cargo: 'Designer',
      horasSemanais: 40,
      salario: 5000,
      isEnable: true,
    },
    {
      id: 6,
      nome: 'João Ricardo',
      cpf: '741.852.963-00',
      cargo: 'Analista Financeiro',
      horasSemanais: 40,
      salario: 5300,
      isEnable: false,
    },
    {
      id: 7,
      nome: 'Samantha Castro',
      cpf: '852.963.741-00',
      cargo: 'Secretária',
      horasSemanais: 30,
      salario: 3500,
      isEnable: true,
    },
    {
      id: 8,
      nome: 'Ricardo Alves',
      cpf: '369.258.147-00',
      cargo: 'Técnico de TI',
      horasSemanais: 40,
      salario: 4800,
      isEnable: false,
    },
    {
      id: 9,
      nome: 'Beatriz Nunes',
      cpf: '159.357.951-00',
      cargo: 'Engenheira',
      horasSemanais: 44,
      salario: 9000,
      isEnable: true,
    },
    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },

    {
      id: 10,
      nome: 'Fábio Moreira',
      cpf: '258.147.369-00',
      cargo: 'Vendedor',
      horasSemanais: 40,
      salario: 4200,
      isEnable: true,
    },
  ];

  dataSource = new MatTableDataSource(this.funcionarios);
  linhaSelecionada: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataSource.data = this.funcionarios;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  selecionarLinha(row: any) {
    console.log('Linha clicada:', row); // Debug
    this.linhaSelecionada = this.linhaSelecionada === row ? null : row;
    console.log('Linha selecionada:', this.linhaSelecionada); // Debug
  }

  goToDetalhes(id: number) {
    console.log('Indo para detalhes do funcionário:', id); // Debug
    this.router.navigate(['/funcionario', id]);
  }

  goToNew() {
    this.router.navigate(['/funcionario/novo']);
  }

  onPageChange(event: PageEvent) {
    this.linhaSelecionada = null;
  }
}
