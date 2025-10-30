import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalculaFolhaComponent } from './calcula-folha/calcula-folha.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { HomeComponent } from './home/home.component';
import { DetalhesComponent } from './funcionario/detalhes/detalhes.component';
import { NewComponent } from './funcionario/new/new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { CnpjMaskDirective } from './shared/pipes/cnpj-mask.directive';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    EmpresaComponent,
    FuncionarioComponent,
    CalculaFolhaComponent,
    HomeComponent,
    DetalhesComponent,
    NewComponent,
    SearchBarComponent,
    CnpjMaskDirective,
  ],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatRadioModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule,
  ],
  exports: [CnpjMaskDirective],
})
export class ModulesModule {}
